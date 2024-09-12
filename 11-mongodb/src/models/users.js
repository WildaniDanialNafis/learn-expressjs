import mongoose from "../utils/db.js";

const loginSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const loginCollection = mongoose.model('Users', loginSchema);

export default loginCollection;