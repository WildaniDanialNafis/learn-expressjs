import express from 'express';

const app = express();
// middleware untuk mencetak log
app.use((req, res, next) => {
    console.log(`Contoh log ...`);
    next();
});

// middleware untuk menampilkan waktu permintaan
app.use((req, res, next) => {
    req.requestTime = new Date();
    next();
});

app.get(`/`, (req, res) => {
    let responseText = "Hello World <br>";
    responseText += `Request Time: ${req.requestTime}`;
    res.send(responseText);
});

app.listen(3000, () => {
    console.log(`Server berjalan http://localhost:3000`);
});