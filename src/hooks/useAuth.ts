import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setError(null);
    } catch (err) {
      setError('Failed to sign in with Google');
      console.error('Error signing in with Google:', err);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err) {
      setError('Failed to sign in');
      console.error('Error signing in:', err);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err) {
      setError('Failed to create account');
      console.error('Error signing up:', err);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setError(null);
    } catch (err) {
      setError('Failed to sign out');
      console.error('Error signing out:', err);
    }
  };

  return {
    user,
    error,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut
  };
}