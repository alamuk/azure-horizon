import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nxjielvvmsyvbzmpwijw.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54amllbHZ2bXN5dmJ6bXB3aWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxODcyNzcsImV4cCI6MjAyODc2MzI3N30.wwywfTl9r9U8UtURtpbUI4DppoQ4wJqVfFHa25L9DK8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
