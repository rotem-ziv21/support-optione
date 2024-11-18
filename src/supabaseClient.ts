// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Supabase Project URL
const supabaseUrl = 'https://mxogygbclznmdtwwofgf.supabase.co';  // Replace with your Supabase URL

// Supabase Anon Key (API key provided)
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14b2d5Z2JjbHpubWR0d3dvZmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDU1MjksImV4cCI6MjA0NzUyMTUyOX0.PodUqwj6NA7xjy_E3TtSDqZsrB8V9pobdBi3bWQbDbA';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
