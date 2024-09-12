import express from 'express';
const app = express();
const PORT = 3000;

app.get(`/`, (req, res) => {
    res.send("Hello World!");
});

app.get('/barangs', (req, res) => {
    res.send("Ini metode get barang");
});

app.post('/barangs', (req, res) => {
    res.send("Ini metode get barang");
});

app.put('/barangs', (req, res) => {
    res.send("Ini metode get barang");
});

app.delete('/barangs', (req, res) => {
    res.send("Ini metode get barang");
});

app.all('/barangs', (req, res) => {
    res.send("Metode yang dapat diakses: GET, POST, PUT, DELETE");
});

app.listen(PORT, () => {
    console.log(`Example app listening on http://localhost:${PORT}`);
});