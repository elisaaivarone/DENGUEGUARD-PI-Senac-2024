import 'dotenv/config'
import express from 'express'
import cors from 'cors'; 

import userRoutes from './routes/userRoutes.js';    

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
  });
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});