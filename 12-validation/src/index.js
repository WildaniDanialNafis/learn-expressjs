import express from 'express';
const app = express();
const PORT = 3000
import routes from './routes/index.js';

import bodyParser from 'body-parser';
import multer from 'multer';
const upload = multer();
import cookieParser from 'cookie-parser';
import session from 'express-session';
import expressEjsLayouts from 'express-ejs-layouts';
import flash from 'express-flash';

import path from 'path';
import url from 'url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})