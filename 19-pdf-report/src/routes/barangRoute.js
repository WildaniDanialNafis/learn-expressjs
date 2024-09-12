import express from 'express';
import { editBarang, getAllBarang, insertBarang, setEditBarang, setNewBarang } from '../controllers/barangController.js';
import { generatePdf, showReport } from '../controllers/reportBarangController.js';
const barangRouter = express.Router();

barangRouter.get('/', getAllBarang);
barangRouter.get('/insert', insertBarang);
barangRouter.get('/report', showReport);
barangRouter.post('/', setNewBarang);
barangRouter.post('/report', generatePdf);
barangRouter.get('/:id', editBarang);
barangRouter.post('/:id', setEditBarang);

export default barangRouter;