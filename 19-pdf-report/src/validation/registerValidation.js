import validator from 'validator';
const sanitization = (data) => {
    return {
        nama: validator.escape(validator.trim(data.nama)),
        email: validator.escape(validator.trim(data.email)),
        password: validator.trim(data.password),
    }
}

const regValid = (dt) => {
    let message = [];
    let data = sanitization(dt);
    if (validator.isEmpty(data.nama)) {
        message.push('Nama tidak boleh kosong');
    }
    if (validator.isEmpty(data.email)) {
        message.push('Email tidak boleh kosong');
    }
    if (!validator.isEmail(data.email)) {
        message.push('Email tidak valid');
    }
    if (validator.isEmpty(data.password)) {
        message.push('Password tidak boleh kosong');
    }
    if (!validator.isStrongPassword(data.password)) {
        message.push('Password harus terdiri dari 8 karakter, minimal 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 simbol');
    }
    return { message, data };
}

export default regValid;