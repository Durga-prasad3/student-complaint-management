
import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseFirestore, isFirebaseConfigured } from "../services/firebase";

const AuthContext = createContext();

function authError(error) {
    const messages = {
        "auth/email-already-in-use": "Email already registered.",
        "auth/invalid-credential": "Invalid email or password.",
        "auth/invalid-email": "Enter a valid email address.",
        "auth/network-request-failed": "Could not connect to Firebase. Check your connection and configuration.",
        "auth/operation-not-allowed": "Email/password sign-in is not enabled in Firebase Authentication.",
        "auth/weak-password": "Password must contain at least 6 characters."
    };
    return new Error(messages[error.code] || error.message || "Authentication failed.", { cause: error });
}

async function readProfile(firebaseUser) {
    const profile = await getDoc(doc(getFirebaseFirestore(), "users", firebaseUser.uid));
    if (!profile.exists()) {
        throw new Error("Your account profile is missing. Contact an administrator.");
    }

    return { id: firebaseUser.uid, ...profile.data() };
}

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(() => !isFirebaseConfigured());

    useEffect(() => {
        if (!isFirebaseConfigured()) {
            return undefined;
        }

        let mounted = true;
        const unsubscribe = onAuthStateChanged(getFirebaseAuth(), async (firebaseUser) => {
            if (!firebaseUser) {
                if (mounted) {
                    setUser(null);
                    setReady(true);
                }
                return;
            }

            try {
                const profile = await readProfile(firebaseUser);
                if (mounted) setUser(profile);
            } catch {
                // A newly created account may not have its profile written yet.
            } finally {
                if (mounted) setReady(true);
            }
        });

        return () => {
            mounted = false;
            unsubscribe();
        };
    }, []);

    const login = async ({ email, password, role = "student" }) => {
        try {
            if (!isFirebaseConfigured()) {
                throw new Error("Firebase is not configured. Set the VITE_FIREBASE_* values in client/.env.local.");
            }

            const credential = await signInWithEmailAndPassword(
                getFirebaseAuth(),
                String(email || "").trim(),
                String(password || "")
            );
            let userData;
            try {
                userData = await readProfile(credential.user);
            } catch (error) {
                await signOut(getFirebaseAuth());
                throw error;
            }
            if (userData.role !== role) {
                await signOut(getFirebaseAuth());
                throw new Error("This account does not have the selected role.");
            }

            setUser(userData);
            return userData;
        } catch (error) {
            throw error.code ? authError(error) : error;
        }
    };

    const register = async ({ name, email, password }) => {
        if (!String(name || "").trim() || !String(email || "").trim() || !password) {
            throw new Error("Please fill in all required fields.");
        }

        let credential;
        try {
            if (!isFirebaseConfigured()) {
                throw new Error("Firebase is not configured. Set the VITE_FIREBASE_* values in client/.env.local.");
            }

            credential = await createUserWithEmailAndPassword(
                getFirebaseAuth(),
                String(email).trim(),
                String(password)
            );
            try {
                const cleanName = String(name).trim();
                await updateProfile(credential.user, { displayName: cleanName });
                const profile = {
                    name: cleanName,
                    email: credential.user.email,
                    phone: "",
                    department: "",
                    role: "student",
                    createdAt: serverTimestamp()
                };
                await setDoc(doc(getFirebaseFirestore(), "users", credential.user.uid), profile);
                const userData = { id: credential.user.uid, ...profile };
                setUser(userData);
                return userData;
            } catch (error) {
                await deleteUser(credential.user).catch(() => {});
                throw error;
            }
        } catch (error) {
            throw error.code ? authError(error) : error;
        }
    };

    const logout = async () => {
        if (isFirebaseConfigured()) {
            await signOut(getFirebaseAuth());
        }
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                ready,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;

