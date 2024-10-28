const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userSchema.pre('save', async (next) => {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

moodule.exports = mongoose.model('User', userSchema);