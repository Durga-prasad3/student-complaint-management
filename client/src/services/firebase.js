import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;

export function isFirebaseConfigured() {
    return Object.values(firebaseConfig).every(Boolean);
}

export function getFirebaseApp() {
    if (!isFirebaseConfigured()) {
        throw new Error("Firebase is not configured. Set the VITE_FIREBASE_* values in client/.env.local.");
    }

    app ??= initializeApp(firebaseConfig);
    return app;
}

export function getFirebaseAuth() {
    return getAuth(getFirebaseApp());
}

export function getFirebaseFirestore() {
    return getFirestore(getFirebaseApp());
}

export function getFirebaseStorage() {
    return getStorage(getFirebaseApp());
}