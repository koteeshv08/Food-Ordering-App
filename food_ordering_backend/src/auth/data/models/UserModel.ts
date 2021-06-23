//Represent how data must look or how it is retrieved
import * as mongoose from 'mongoose'

export interface UserModel extends mongoose.Document {
    type: string,
    name: string,
    email: string,
    password: string
}

export const UserSchema = new mongoose.Schema({
    type: {type: String , requried: true},
    name: String,
    email: {type: String , requried: true},
    password: String,
})