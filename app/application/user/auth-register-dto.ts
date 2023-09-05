import User from "@domain/entities/user/user";

class AuthRegisterDTO {
    private readonly user: User;
    private readonly id: string;
    private readonly email: string;
    private readonly password: string;
    private readonly username: string;
    private readonly dob: Date;

    constructor(request) {
        const { email, password, username, dob } = request;
        const user = User.createFromDetail({
            email,
            password,
            username,
            dob,
        });

        this.user = user;
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

    getPassword(): string {
        return this.password;
    }

    getUserName(): string {
        return this.username;
    }
}

export default AuthRegisterDTO;
