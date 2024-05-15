const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Routes
app.post('/register', async (req, res) => {
  const { name, email, phone, ticketType } = req.body;
  const { data, error } = await supabase
    .from('registrations')
    .insert([{ name, email, phone, ticketType }]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

app.get('/registrations', async (req, res) => {
  const { data, error } = await supabase
    .from('registrations')
    .select('*');

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
