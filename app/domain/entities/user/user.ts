import Guard from "@infra/utils/guard";
import DomainException from "../exceptions/doman-exceptions";
import BaseEntity from "@domain/entities/base/base";

type UserEntitiy = {
    id?: string;
    username: string;
    email: string;
    password: string;
    dob: Date;
    createdAt?: Date;
    updatedAt?: Date;
};

class User extends BaseEntity {
    id?: string;
    username: string;
    email: string;
    password: string;
    dob: Date;
    createdAt: Date;
    updatedAt: Date;

    constructor({ id, username, email, password, dob }: UserEntitiy) {
        super();
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.dob = dob;
    }

    /**
     * Set Created Date
     * @param {Date} createdAt
     */
    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
    }

    /**
     * Set Updated Date
     * @param {Date} updatedAt
     */
    setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt;
    }

    setPassword(password: string) {
        this.password = password;
    }

    /**
     * Create User Object
     * @param {object} userObj
     * @returns User
     */
    static createFromObject(userObj: any): User {
        const user = new User({
            id: userObj.id,
            email: userObj.email,
            username: userObj.username,
            password: userObj.password,
            dob: userObj.dob,
        });

        if (userObj.createdAt) {
            user.setCreatedAt(userObj.createdAt);
        }

        if (userObj.updatedAt) {
            user.setUpdatedAt(userObj.updatedAt);
        }

        return user;
    }

    /**
     * Create User Object with Id
     * @param {object} userObj
     * @returns User
     */

    static createFromDetail(userObj: any): User {
        const { email, username, password, dob } = userObj;

        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: email, argumentName: "email" },
            { argument: username, argumentName: "username" },
            { argument: password, argumentName: "password" },
            { argument: dob, argumentName: "dob" },
        ]);

        if (!guardResult.succeeded) {
            throw new DomainException(guardResult.message);
        }

        const invalidDob = Guard.greaterThan(new Date(), dob, "Invalid dob");

        if (!invalidDob.succeeded) {
            throw new DomainException(invalidDob.message);
        }

        return new User({
            email,
            username,
            password,
            dob,
        });
    }
}

export default User;
