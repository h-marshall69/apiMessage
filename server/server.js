import express from "express";
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hola desde el servidor!' });
  });

// Iniciar el servidor
const PORT = process.env.PORT || 80;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✓ Server is running at http://localhost:${PORT}`);
});
