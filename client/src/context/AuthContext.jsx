
import { createContext, useContext, useState } from "react";

const API_BASE_URL = "http://localhost:8000";
const STORAGE_KEYS = {
    user: "smartCampusUser",
    token: "smartCampusToken",
    users: "smartCampusUsers"
};

const defaultUsers = [
    {
        id: 1,
        name: "Durga Prasad",
        email: "test@gmail.com",
        password: "123456",
        role: "student"
    }
];

function readStoredUsers() {
    try {
        const storedUsers = localStorage.getItem(STORAGE_KEYS.users);

        if (!storedUsers) {
            localStorage.setItem(
                STORAGE_KEYS.users,
                JSON.stringify(defaultUsers)
            );
            return [...defaultUsers];
        }

        const parsed = JSON.parse(storedUsers);

        return Array.isArray(parsed) && parsed.length
            ? parsed
            : [...defaultUsers];
    } catch {
        localStorage.setItem(
            STORAGE_KEYS.users,
            JSON.stringify(defaultUsers)
        );
        return [...defaultUsers];
    }
}

function saveSession(userData, token = null) {
    localStorage.setItem(
        STORAGE_KEYS.user,
        JSON.stringify(userData)
    );

    if (token) {
        localStorage.setItem(STORAGE_KEYS.token, token);
    } else {
        localStorage.removeItem(STORAGE_KEYS.token);
    }
}

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem(STORAGE_KEYS.user);

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const login = async ({ email, password, role = "student" }) => {
        const payload = {
            email: String(email || "").trim(),
            password: String(password || "").trim(),
            role
        };

        if (!payload.email || !payload.password) {
            throw new Error("Please enter email and password.");
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/?path=auth&action=login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Invalid email or password.");
            }

            const userData = {
                ...data.user,
                role: data.user.role || role
            };

            saveSession(userData, data.token || null);
            setUser(userData);

            return userData;
        } catch (error) {
            const registeredUsers = readStoredUsers();
            const matchingUser = registeredUsers.find(
                (entry) =>
                    entry.email.toLowerCase() === payload.email.toLowerCase() &&
                    entry.password === payload.password
            );

            if (!matchingUser) {
                throw new Error(
                    error.message || "Invalid email or password."
                );
            }

            const fallbackUser = {
                ...matchingUser,
                id: matchingUser.id || Date.now(),
                role: matchingUser.role || role
            };

            saveSession(fallbackUser, `demo-${Date.now()}`);
            setUser(fallbackUser);

            return fallbackUser;
        }
    };

    const register = async ({ name, email, password, role = "student" }) => {
        const payload = {
            name: String(name || "").trim(),
            email: String(email || "").trim(),
            password: String(password || "").trim(),
            role
        };

        if (!payload.name || !payload.email || !payload.password) {
            throw new Error("Please fill in all required fields.");
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/?path=auth&action=register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Registration failed.");
            }

            const userData = {
                ...data.user,
                role: data.user.role || role
            };

            saveSession(userData, data.token || null);
            setUser(userData);

            return userData;
        } catch (error) {
            const registeredUsers = readStoredUsers();
            const duplicateUser = registeredUsers.find(
                (entry) =>
                    entry.email.toLowerCase() === payload.email.toLowerCase()
            );

            if (duplicateUser) {
                throw new Error("Email already registered.");
            }

            const fallbackUser = {
                id: Date.now(),
                name: payload.name,
                email: payload.email,
                password: payload.password,
                phone: "",
                department: "",
                role: payload.role
            };

            const nextUsers = [...registeredUsers, fallbackUser];
            localStorage.setItem(
                STORAGE_KEYS.users,
                JSON.stringify(nextUsers)
            );

            saveSession(fallbackUser, `demo-${Date.now()}`);
            setUser(fallbackUser);

            return fallbackUser;
        }
    };

    const logout = async () => {
        const token = localStorage.getItem(STORAGE_KEYS.token);

        if (token) {
            try {
                await fetch(`${API_BASE_URL}/?path=auth&action=logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch {
                // Ignore logout errors and clear local session anyway.
            }
        }

        localStorage.removeItem(STORAGE_KEYS.user);
        localStorage.removeItem(STORAGE_KEYS.token);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;

