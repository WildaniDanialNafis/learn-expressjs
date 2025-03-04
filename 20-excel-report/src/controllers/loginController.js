import loginCollection from '../models/usersModel.js';
import { compare } from '../utils/bcrypt.js';
import loginValid from '../validation/loginValidation.js';

const getLogin = (req, res) => {
    const data = {
        title: `Halaman Login`,
        layout: `layout/main-layout`,
        message: req.flash('message'),
        data: req.flash('data')[0]
    }
    res.render('login', data);
}

const postLogin = async (req, res) => {
    const hasil = await loginValid(req.body);
    if (hasil.message.length > 0) {
        res.status(400);
        // const data = {
        //     title: `Halaman Login`,
        //     layout: `layout/main-layout`,
        //     message: `Invalid data`
        // }
        // res.render('login', data);
        req.flash('message', [`error`, `Error !`, hasil.message[0]]);
        req.flash('data', hasil.data);
        res.redirect('/login');
    } else {
        const checking = await loginCollection.findOne({ email: hasil.data.email });
        if (checking) {
            if (await compare(hasil.data.password, checking.password)) {
                req.session.user = {
                    nama: checking.nama,
                    email: checking.email,
                };
                res.redirect(`/protected-page`);
            } else {
                res.status(400);
                // const data = {
                //     title: `Halaman Login`,
                //     layout: `layout/main-layout`,
                //     message: `Invalid data`
                // };
                // res.render('login', data);
                req.flash('message', [`error`, `Error !`, `Password salah`]);
                req.flash('data', hasil.data);
                res.redirect('/login');
            }
        } else {
            res.status(400);
            req.flash('message', [`error`, `Error !`, `Email tidak terdaftar`]);
            res.redirect('/login');
        }
        
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('login');
}

export { getLogin, postLogin, logout };