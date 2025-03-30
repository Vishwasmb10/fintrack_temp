import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://uvwxchyurzxfgeglahcu.supabase.co';
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3hjaHl1cnp4ZmdlZ2xhaGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNjg2NTQsImV4cCI6MjA1ODg0NDY1NH0.iOP6Hh9OOzIN2t5-cEAMH5SyRdSPNvMNU1KCkrakWDI"
const supabase = createClient(supabaseUrl, supabaseKey);
export {supabase}; 