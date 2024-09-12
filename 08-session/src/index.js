import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

const app = express();
const PORT = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 60000
  }
}))

app.get('/login', (req, res) => {
  console.log(req.sessionID);
  const {username, password} = req.body;
  if (username && password) {
    if (req.session.autheticated) {
        res.json(req.json);
    } else {
        if (password === '1234') {
            req.session.autheticated = true
            req.session.user = {
                username,
                password
            };
            res.json(req.session);
        } else {
            res.status(403).json({ message: 'Bad Request' })
        }
    }
  } else {
    res.status(403).json({ message: 'Bad Credentials' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})