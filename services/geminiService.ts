
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA2Go2Gdi3cl0ybryv8bDfXR_3V9UJrBTg",
  authDomain: "open-slot-8f4b1.firebaseapp.com",
  projectId: "open-slot-8f4b1",
  storageBucket: "open-slot-8f4b1.firebasestorage.app",
  messagingSenderId: "896094306858",
  appId: "1:896094306858:web:524a0dbea794ad2e7af953",
  measurementId: "G-3GJ9QXM8DT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Export Firestore methods to be used by other components
export { onSnapshot, addDoc, deleteDoc, doc, query, orderBy };

// Helper functions for Firestore
export const productsCol = collection(db, 'produket');
