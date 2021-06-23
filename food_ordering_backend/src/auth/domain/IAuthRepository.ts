import User from "./User";

/*This is an interface since we will use a repository as an abstraction which sits above MongoDB*/
export default interface IAuthRepository {
    find(email: string): Promise<User>
    add(
        name: string, 
        email: string, 
        passwordHash: string, 
        type: string
    ): Promise<string>
}