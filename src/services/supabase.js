import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yoifmijgzpxibpejcuen.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaWZtaWpnenB4aWJwZWpjdWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5OTM4MDUsImV4cCI6MjA5MjU2OTgwNX0.yngTExyIfq5odaatDWMwKlGPxAxrevbSpZNrIGxC6t8'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
