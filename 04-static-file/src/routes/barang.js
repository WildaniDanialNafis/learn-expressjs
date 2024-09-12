import express from 'express';
const barangRouter = express.Router();

barangRouter.route(`/`)
.get((req, res) => {
    res.send("Ini metode get barang");
})
.post((req, res) => {
    res.send("Ini metode post barang");
});

barangRouter.route(`/:id`)
.get((req, res) => {
    res.send("Ini metode get barang dengan id = " + req.params.id);
})
.put((req, res) => {
    res.send("Ini metode put barang dengan id = " + req.params.id);
})
.delete((req, res) => {
    res.send("Ini metode delete barang dengan id = " + req.params.id);
});

export default barangRouter;