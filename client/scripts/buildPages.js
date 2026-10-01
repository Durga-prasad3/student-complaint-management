import { spawnSync } from "node:child_process";
import process from "node:process";

const firebaseKeys = [
    "VITE_FIREBASE_API_KEY",
    "VITE_FIREBASE_AUTH_DOMAIN",
    "VITE_FIREBASE_PROJECT_ID",
    "VITE_FIREBASE_STORAGE_BUCKET",
    "VITE_FIREBASE_MESSAGING_SENDER_ID",
    "VITE_FIREBASE_APP_ID"
];
const repositoryVariables = JSON.parse(process.env.FIREBASE_REPOSITORY_VARIABLES || "{}");
const environment = { ...process.env };
const missingKeys = firebaseKeys.filter((key) => !repositoryVariables[key]);

if (missingKeys.length > 0) {
    console.error(`Missing GitHub Actions variables: ${missingKeys.join(", ")}`);
    process.exit(1);
}

for (const key of firebaseKeys) {
    environment[key] = repositoryVariables[key];
}

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const build = spawnSync(npmCommand, ["run", "build"], {
    env: environment,
    stdio: "inherit",
    shell: process.platform === "win32"
});

if (build.error) throw build.error;
process.exitCode = build.status ?? 1;