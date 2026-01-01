import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tptsretvxlicdpsmtdlx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwdHNyZXR2eGxpY2Rwc210ZGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMDQwOTgsImV4cCI6MjA4MjY4MDA5OH0.NsO8uAOsvqo7tNxEtwBalRkOoRdqOTC8JHrnHDB76ag";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
