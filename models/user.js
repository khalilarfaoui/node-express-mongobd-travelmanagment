//create model of user Document
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    username:{type:String,unique:true},
    lastname:{type:String},
    firstname:{type:String},
    email:{type:String,unique:true},
    
    role: { 
        type: String, 
        enum: ['client', 'admin'], 
        default: 'client' 
    },
    password:String,
    phone:String,
})

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10)
    }
    next();
})


const User = mongoose.model('User',userSchema)

module.exports = User;