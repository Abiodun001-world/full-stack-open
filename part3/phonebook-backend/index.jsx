const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3001;

// Step 1: Define hardcoded phonebook entries
let phonebook = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

// Define a custom token for Morgan
morgan.token('postData', (req) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    // Check if the request contains JSON data
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
      // Stringify and log the JSON data
      return JSON.stringify(req.body);
    }
  }
  // Return an empty string if no data is logged
  return '';
});

// Use Morgan middleware with the custom token
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :postData', {
    skip: (req) => req.method !== 'POST' && req.method !== 'PUT',
  })
);

// Step 1: Define a route to retrieve phonebook entries
app.get('/api/persons', (req, res) => {
  res.json(phonebook);
});

// Step 1: Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Step 2: Define a route for /info
app.get('/info', (req, res) => {
  const timestamp = new Date();
  const entryCount = phonebook.length;

  res.send(`
    <p>Phonebook has info for ${entryCount} people</p>
    <p>${timestamp}</p>
  `);
});

// Step 3: Define a route to retrieve a single phonebook entry by id
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const entry = phonebook.find((entry) => entry.id === id);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404).end();
  }
});

// Step 4: Define a route to delete a phonebook entry by id
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((entry) => entry.id !== id);
  res.status(204).end();
});

// Step 5: Define a route to add a new phonebook entry
app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  const duplicateEntry = phonebook.find((entry) => entry.name === body.name);

  if (duplicateEntry) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  const newEntry = {
    id: Math.floor(Math.random() * 10000), // Generate a random id
    name: body.name,
    number: body.number,
  };

  phonebook = phonebook.concat(newEntry);
  res.json(newEntry);
});

// Step 6: Implement error handling for creating new entries
app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  const duplicateEntry = phonebook.find((entry) => entry.name === body.name);

  if (duplicateEntry) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  const newEntry = {
    id: Math.floor(Math.random() * 10000), // Generate a random id
    name: body.name,
    number: body.number,
  };

  phonebook = phonebook.concat(newEntry);
  res.json(newEntry);
});
