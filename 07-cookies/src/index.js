import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.get('/set-cookies', (req, res) => {
    // res.setHeader('Set-Cookie', 'name=Wildani');
    res.cookie('name', 'Nafis', {
        // maxAge: 5000,
        // expires: new Date(Date.now() + 5000)
        httpOnly: true,
        secure: true,
        domain: "localhost"
    });
    res.send('Cookies have been set!')
})

app.get('/get-cookies', (req, res) => {
    res.send(req.cookies)
})

app.get('/delete-cookies', (req, res) => {
    res.clearCookie('name');
    res.send('Cookies have been deleted!');
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})