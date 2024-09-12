import express from 'express';
const appMiddleware = express();

import bodyParser from 'body-parser';
import multer from 'multer';
const upload = multer();
import cookieParser from 'cookie-parser';
import session from 'express-session';
import expressEjsLayouts from 'express-ejs-layouts';
import flash from 'express-flash';

import path from 'path';
import url from 'url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

import logProcess from '../logs/log.js';

// Set up view engine and static files first
appMiddleware.use(expressEjsLayouts);
appMiddleware.use(express.static(path.join(__dirname, '../../public')));

// Body parsers and other middleware
appMiddleware.use(bodyParser.json());
appMiddleware.use(bodyParser.urlencoded({ extended: true }));
appMiddleware.use(upload.array());
appMiddleware.use(cookieParser());
appMiddleware.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
appMiddleware.use(flash());

// Logging middleware
appMiddleware.use(logProcess);

export default appMiddleware;
