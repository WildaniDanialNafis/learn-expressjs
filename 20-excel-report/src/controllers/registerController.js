import loginCollection from '../models/usersModel.js';
import regValid from '../validation/registerValidation.js';
import { encrypt } from '../utils/bcrypt.js';
import logger from '../logs/winston.js';

const getSignup = (req, res) => {
    const data = {
        title: `Signup`,
        layout: `layout/main-layout`,
        message: req.flash('message'),
        data: req.flash('data')[0]
    }
    res.render('signup', data);
}

const postSignup = async (req, res) => {
    const hasil =  await regValid(req.body);
    if (hasil.message.length > 0) {
        res.status(400);
        // const data = {
        //     title: `Signup`,
        //     layout: `layout/main-layout`,
        //     message: `Invalid data`
        // }
        // res.render('signup', data);
        req.flash('message', [`error`, `Error !`, hasil.message[0]]);
        req.flash('data', hasil.data);
        res.redirect('/signup');
    } else {
            const checking = await loginCollection.findOne({ email: hasil.data.email });
            if (checking) {
                res.status(400);
                // const data = {
                    //     title: `Signup`,
                    //     layout: `layout/main-layout`,
                    //     message: `Email already exists`
                    // }
                    // res.render('signup', data)
                    req.flash('message', [`error`, `Error !`, `Email already exists`]);
                    req.flash('data', hasil.data)
                    res.redirect('/signup');
        } else {
            const newUser = {
                nama: hasil.data.nama,
                email: hasil.data.email,
                password: await encrypt(hasil.data.password)
            };
            await loginCollection.insertMany([newUser]);
            req.session.user = {
                nama: newUser.nama,
                email: newUser.email,
            };
            res.redirect('/protected-page');
        }
    }
}

const protectedPage = (req, res, next) => {
    const data = {
        title: `Halaman Login`,
        layout: `layout/main`,
        message: req.flash('message'),
        data:`Welcome ` + req.session.user.nama
    };
    res.render('protected-page', data)
}

function isLoggedIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        let err = new Error("Anda belum login !");
        next(err);
    }
}

const useProtectedPage = (err, req, res, next) => {
    // let data = {
    //     title: `Halaman Login`,
    //     layout: `layout/main-layout`,
    //     message: err.message
    // }
    // res.render('login', data);
    let message;
    if (err.message != "Anda belum login !") {
        message = err.message.split(' - ')[1];
        logger.error(err);
    } else {
        message = err.message;
    }
    req.flash('message', [`error`, `Error !`, message]);
    if (req.session.user) {
        res.redirect('/protected-page');
    } else {
        res.redirect('/login');
    }
}

export { getSignup, postSignup, protectedPage, isLoggedIn, useProtectedPage };