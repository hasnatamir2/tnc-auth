import IUserRepository from "@domain/entities/user/Iuser-repository";
import User from "@domain/entities/user/user";
import { injectable } from "tsyringe";
import { Option, Some, None } from "oxide.ts";
import userModel from "@infra/database/mongodb/user-model";
import PaginatedData from "@infra/utils/paginated-data";

@injectable()
class UserRepository implements IUserRepository {
    private database = null;

    constructor() {
        this.database = userModel;
    }

    async add(userEntity): Promise<Option<boolean>> {
        try {
            await this.database.create(userEntity.toObj());
            return Some(true);
        } catch (error) {
            return error;
        }
    }

    async getByEmail(email: string): Promise<Option<User>> {
        try {
            const result = await this.database.findOne({ email });
            if (!result) {
                return None;
            }
            return Some(User.createFromObject(result));
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async getById(id: string): Promise<Option<User>> {
        try {
            const result = await this.database.findById(id);
            if (!result) {
                return None;
            }
            return Some(User.createFromObject(result));
        } catch (e) {
            return e;
        }
    }

    async getAll({ paginationOptions, query }): Promise<PaginatedData<User>> {
        try {
            const total = await this.database.count({});
            const result = await this.database
                .find({})
                .limit(paginationOptions.limit())
                .skip(paginationOptions.offset());
            const items = result.map((user) => User.createFromObject(user));
            return new PaginatedData<User>(paginationOptions, total, items);
        } catch (e) {
            return e;
        }
    }

    async calculateAge(id): Promise<Option<number>> {
        const age = await this.database.aggregate([
            {
                $group: {
                    _id: id,
                    age: {
                        $avg: {
                            $subtract: [new Date(), "$dob"],
                        },
                    },
                },
            },
            {
                $project: {
                    age: {
                        $floor: {
                            $divide: ["$age", 365 * 24 * 60 * 60 * 1000],
                        },
                    },
                },
            },
        ]);
        return Some(age);
    }

    async update(userEntity) {
        await this.database.updateOne(
            { id: userEntity.id },
            {
                $set: {
                    username: userEntity.username,
                    email: userEntity.email,
                    password: userEntity.password,
                    dob: userEntity.dob,
                    updatedAt: Date.now(),
                },
            }
        );
        return true;
    }

    async delete(id) {
        await this.database.deleteOne({ id });
        return true;
    }
}
export default UserRepository;
