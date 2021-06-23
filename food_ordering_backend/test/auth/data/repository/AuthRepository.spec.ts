import mongoose from 'mongoose'
import AuthRepository from '../../../../src/auth/data/repository/AuthRepository'
import dotenv from 'dotenv'
import { expect } from 'chai'
import 'mocha'

dotenv.config()

describe('AuthRespository', () => {
    let client: mongoose.Mongoose
    let sut: AuthRepository

    beforeEach(() => {
        client = new mongoose.Mongoose()
        const connectionStr = encodeURI(process.env.TEST_DB as string)
        client.connect(connectionStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) 
        sut = new AuthRepository(client)
    })
    afterEach(()=>{
        client.disconnect()
    })

    it('should return user when email is found', async () => {
        //arrange
        const email = 'example@gmail.com'
        const password = 'pass1234'

        //action
        const result = await sut.find(email)

        //assert
        expect(result).to.not.be.empty
    })

    it('should return user id when added to db', async () => {
        //arrange
        const user = {
            email: 'mail@gmail.com',
            name: 'Elliot',
            password: 'password',
            type: 'email'
        }

        //action
        const result = await sut.add(user.name ,user.email, user.password, user.type)

        //assert
        expect(result).to.not.be.empty
    })
})