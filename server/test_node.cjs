require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

console.log('Supabase URL:', process.env.SUPABASE_URL);
try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    console.log('Supabase client created successfully');
} catch (e) {
    console.error('Error creating client:', e);
}
