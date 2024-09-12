import validator from 'validator';
const sanitization = (data) => {
    return {
        email: validator.escape(validator.trim(data.email)),
        password: validator.trim(data.password),
    }
}

const loginValid = (dt) => {
    let message = [];
    let data = sanitization(dt);
    if (validator.isEmpty(data.email)) {
        message.push('Email tidak boleh kosong');
    }
    if (!validator.isEmail(data.email)) {
        message.push('Email tidak valid');
    }
    if (validator.isEmpty(data.password)) {
        message.push('Password tidak boleh kosong');
    }
    return { message, data };
}

export default loginValid;