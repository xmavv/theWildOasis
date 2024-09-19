import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bpqvtsvjfiqpkggdytwk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwcXZ0c3ZqZmlxcGtnZ2R5dHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2ODYzOTgsImV4cCI6MjA0MjI2MjM5OH0.V6IWD8gffmtggizp5cdzazga4B174iEiET8nOZckqGw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
