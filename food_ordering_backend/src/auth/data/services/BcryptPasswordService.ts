import IPasswordService from "../../services/IPasswordService";
import bcrypt from 'bcrypt'

/*Use a decrypt package to handle password hasing*/
export default class BcryptPasswordService implements IPasswordService{
    constructor(private readonly saltRounds: number = 10) {}
    /*SaltRounds is the number which determines the level of hashing*/ 

    hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds)
    }
    compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}