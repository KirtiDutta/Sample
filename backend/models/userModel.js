import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})
userSchema.methods.matchPassword = async function(enteredPassword){
return await bcrypt.compare(enteredPassword, this.password)
}

//For  encryption of password entered during register
userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next() //password modify ni hua h to bina encrypt kre dobara aage bdhjao
    }
    const salt = await bcrypt.genSalt(10)
    //salt adds  additional values to the end of the password and changes tha hash value produced
    //salt is used to make encrypted password more complex (to encrypt hashed password)
    this.password = await bcrypt.hash(this.password, salt) //hashing password and adding salt i.e double encrypting paassword
})
const User= mongoose.model("User" , userSchema)

export default User