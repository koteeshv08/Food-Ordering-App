import 'mocha'
import chai, { expect } from 'chai'
import SignInUseCase from '../../../src/auth/usecases/SignInUseCase'
import IAuthRepository from '../../../src/auth/domain/IAuthRepository'
import IPasswordService from '../../../src/auth/services/IPasswordService'
import FakeRespository from '../helpers/FakeRepository'
import FakePasswordService from '../helpers/FakePasswordService'
import chaiAsPromised from 'chai-as-promised'

//middleware
chai.use(chaiAsPromised)

/*Similiar to group in flutter testing framework */
describe('SignInUseCase', () => {
    let sut: SignInUseCase
    let respository: IAuthRepository
    let passwordService: IPasswordService

    const user = {
        email: 'example@gmail.com',
        id: '1234',
        name: 'Kim',
        password: '$2b$10$K0HEqyYUlQLaj.Xkp9tDzuRclzJqdKCYV7gEHtSVIlu8NRtLM6flC',
        type: 'email',
    }

    beforeEach(() => {
        respository = new FakeRespository()
        passwordService = new FakePasswordService()
        sut = new SignInUseCase(respository, passwordService)
    })

    it('should throw error when user is not found', async () => {
        const user = {email: 'wrong@gmail.com', password: '1234', name: '', auth_type:'email'}

        //assert
        await expect(
            sut.execute(
                user.email, 
                user.password, 
            )
        ).to.be.rejectedWith('User not found')
    })

    it('should return user id when email and password is correct', async () => {
        const user = {email: 'example@gmail.com',
        id: '1234',
        name: 'Kim',
        password: '$2b$10$K0HEqyYUlQLaj.Xkp9tDzuRclzJqdKCYV7gEHtSVIlu8NRtLM6flC',
        type: 'email'}
        const id = await sut.execute(user.email, user.password)

        //assert
        expect(id).to.be.equal(user.id)
    })

    it('should return user id when email is correct and type is not email', async () => {
        // const user = {email:'tester@gmail.com',
        // id: '1556',
        // name: 'Ben',
        // password: '',
        // type: 'google'}

        const id = await sut.execute(user.email, '')

        //assert
        expect(id).to.be.equal(user.id)
    })
})