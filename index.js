const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Supabase client
const supabaseUrl = 'https://vmbfdfkiavbwzmegdfwk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtYmZkZmtpYXZid3ptZWdkZndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3ODE0NjAsImV4cCI6MjAzMTM1NzQ2MH0.jM_uDH5eOZ519B-Tj8p3jXSuJuamP0V-22MMb8pB3Sg';
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/register', async (req, res) => {
    const { data, error } = await supabase
        .from('register')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ register: data });
});
// Endpoint to handle registration
app.post('/register', async (req, res) => {
    const { firstName, surname, phoneNumber, emailAddress, residence, fellowshipName } = req.body;

    const { data, error } = await supabase
        .from('register')
        .insert([
            { 
                first_name: firstName,
                surname: surname,
                phone_number: phoneNumber,
                email_address: emailAddress,
                residence: residence,
                micro_church: fellowshipName
            }
        ]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'Registration successful!', data });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});