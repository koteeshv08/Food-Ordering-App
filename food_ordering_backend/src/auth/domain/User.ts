export default class User {
    constructor(public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly passwordHash: string,
        public readonly type: string
    ) { }
}