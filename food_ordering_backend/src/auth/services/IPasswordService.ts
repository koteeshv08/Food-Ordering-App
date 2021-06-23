/*This services folder is limited only to this application and not to the domain*/ 
export default interface IPasswordService {
    hash(password: string): Promise<string>
    compare(password: string, hash: string):Promise<boolean>
}