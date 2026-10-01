# SmartCampus Complaint Management

SmartCampus is a role-based campus complaint application. Firebase Authentication manages accounts, Cloud Firestore stores profiles and complaint activity, and Cloud Storage stores optional complaint images.

## Firebase Setup

1. Create a Firebase project and register a Web app.
2. In Firebase Authentication, enable the Email/Password provider.
3. Create a Cloud Firestore database and enable Cloud Storage.
4. Copy `client/.env.example` to `client/.env.local` and fill in the Web app configuration from Firebase Project settings. These `VITE_` values are public client configuration; never put service-account credentials in the client.
5. From the project root, deploy the security rules:

```powershell
npm install --global firebase-tools
firebase login
firebase use --add
firebase deploy --only firestore:rules,storage --project YOUR_FIREBASE_PROJECT_ID
```

The deployment requires a Firebase project with Firestore and Storage enabled. `firebase.json` points the CLI to `firestore.rules` and `storage.rules`.

## Create Trusted Accounts

Public registration creates student accounts only. To provision an administrator or staff member, create the account in Firebase Authentication, then create a Firestore document at `users/{AUTH_UID}` with these fields:

```json
{
  "name": "Staff Name",
  "email": "staff@example.edu",
  "phone": "",
  "department": "IT",
  "role": "staff"
}
```

Use `admin` for the administrator role. Department values must match the complaint form: `IT`, `Electrical`, `Civil`, `Hostel`, `Transport`, `Administration`, or `Security`. Create the first admin profile using the Firebase Console; only a trusted console/admin operation should grant elevated roles. Staff receive complaints from their department, and administrators can assign complaints to registered staff in the same department.

## Run Locally

```powershell
cd client
npm install
npm run dev
```

Run `npm run lint` and `npm run build` from `client/` to validate the frontend. If Firebase settings are not configured, authentication and data operations show a configuration error rather than silently falling back to browser-only demo accounts.

## Data and Access

- `users/{uid}` stores the user profile and role. New signups are always students; users cannot change their own role.
- `complaints/{id}` stores complaint details and status history. Students can read their own complaints, staff can read their department, and admins can read all complaints.
- `complaints/{id}/updates/{id}` stores comments and resolution feedback.
- `complaint-images/{uid}/{complaintId}/...` stores optional PNG/JPEG uploads limited to 5 MB. Storage rules restrict access to the owner, department staff, and admins.
- Role-based access is enforced by Firestore and Storage rules, not by hidden UI controls.

## GitHub Pages

GitHub Pages serves only the React frontend; Firebase provides the application backend. Add these repository Actions variables under **Settings > Secrets and variables > Actions > Variables** so the Pages build can initialize Firebase:

`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, and `VITE_FIREBASE_APP_ID`.

The existing workflow runs lint and builds the client on pushes to `main`. Firebase Web configuration is public; security depends on the deployed rules and Authentication settings.