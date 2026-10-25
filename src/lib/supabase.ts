import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cqjaqbujrhgqcqygbyow.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxamFxYnVqcmhncWNxeWdieW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4MTM3MzIsImV4cCI6MjEwODM4OTczMn0.6lWdRrzUFfNifvu9tt0wUmc-dxzWC4I8qxdoT_CcKig";

// Public Supabase client for browser/client-side requests
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin Supabase client using Service Role for secure backend operations
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabaseAdmin = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey)
  : supabase;
