import express from 'express';
import { editBarang, getAllBarang, insertBarang, setEditBarang, setNewBarang } from '../controllers/barang.js';
const barangRouter = express.Router();

barangRouter.get('/', getAllBarang);
barangRouter.get('/insert', insertBarang);
barangRouter.post('/', setNewBarang);
barangRouter.get('/:id', editBarang);
barangRouter.post('/:id', setEditBarang);

export default barangRouter;