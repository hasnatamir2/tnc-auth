import User from "@domain/entities/user/user";

class AuthRegisterDTO {
    private readonly user: User;
    private readonly id: string;
    private readonly email: string;
    private readonly password: string;
    private readonly username: string;
    private readonly dob: Date;

    constructor(request) {
        const { id, email, password, username, dob } = request;
        const user = User.createFromObject({
            id,
            email,
            password,
            username,
            dob,
        });

        this.user = user;
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.username = user.username;
        this.dob = user.dob;
    }

    getUser(): User {
        return this.user;
    }

    getEmail(): string {
        return this.email;
    }

    getUserId(): string {
        return this.id;
    }

    getPassword(): string {
        return this.password;
    }

    getUserName(): string {
        return this.username;
    }

    getDob(): Date {
        return this.dob;
    }
}

export default AuthRegisterDTO;
