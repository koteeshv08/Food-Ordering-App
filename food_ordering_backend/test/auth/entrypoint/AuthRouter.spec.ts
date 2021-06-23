import IAuthRepository from "../../../src/auth/domain/IAuthRepository"
import express from 'express'
import FakeRespository from "../helpers/FakeRepository"
import JwtTokenService from "../../../src/auth/data/services/JwtTokenService"
import BcryptPasswordService from "../../../src/auth/data/services/BcryptPasswordService"
import AuthRouter from "../../../src/auth/entrypoint/controllers/AuthRouter"
import request from 'supertest'
import { expect } from "chai"

describe('AuthRouter', () => {
    let repository: IAuthRepository
    let app: express.Application

    const user = {
        email: 'example@gmail.com',
            id: '1234',
            name: 'Kim',
            password: 'pass1234',
            type: 'email'
    }

    beforeEach(() => {
        repository = new FakeRespository()
        let tokenService = new JwtTokenService('privateKey')
        let passwordService = new BcryptPasswordService

        app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        //Generates a path/route to our controller /auth ---> /auth/signin
        app.use('/auth', AuthRouter.configure(repository, tokenService, passwordService))
    })

    it('should return 404 when user is not found', async () => {
        await request(app).post('/auth/signin').send({}).expect(404)
    })

    it('should return 200 and token when user is found', async () => {
            await request(app)
            .post('/auth/signin')
            .send({ email: user.email, password: user.password })
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body.auth_token).to.not.be.empty
            })
    })
})