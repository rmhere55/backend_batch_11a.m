import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.get('/api/jokes', (req, res) => {
  const jokes = [
    { id: 1, title: "Atoms", joke: "Why don't scientists trust atoms? Because they make up everything!" },
    { id: 2, title: "Scarecrow", joke: "Why did the scarecrow win an award? Because he was outstanding in his field!" },
    { id: 3, title: "Skeletons", joke: "Why don’t skeletons fight each other? They don’t have the guts." },
  ];

  res.json(jokes); // Send the jokes as a JSON response
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
