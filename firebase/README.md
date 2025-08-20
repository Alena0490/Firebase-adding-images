# React + Firebase Gallery

Form → Firestore → on‑page gallery with lightbox and delete.

## Quick start

1. Install deps

```bash
npm install
```

2. Create `src/firebase/config.js`

```js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const app = initializeApp({ /* your Firebase keys */ });
export const db = getFirestore(app);
```

3. Run

```bash
# CRA
npm start
# Vite
npm run dev
```

## How it works

* `addDoc(collection(db, 'my-website'), { title, imageUrl, alt, description })` on form submit
* `getDocs` on mount to render items; `deleteDoc(doc(db, 'my-website', id))` to remove
* Lightbox with `selectedIndex` and ←/→ navigation

## Notes

* Clear form after successful submit (the reset lines are already in code, just uncomment).
* Set Firestore Security Rules for production (e.g., allow only authenticated reads/writes).
