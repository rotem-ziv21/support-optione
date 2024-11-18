// src/auth.ts
import { supabase } from './supabaseClient';

// Function to sign up a new user
export const signUp = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.error('Error signing up:', error.message);
  } else {
    console.log('User signed up successfully:', user);
  }
};

// Function to sign in an existing user
export const signIn = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });
  if (error) {
    console.error('Error signing in:', error.message);
  } else {
    console.log('User signed in successfully:', user);
  }
};
