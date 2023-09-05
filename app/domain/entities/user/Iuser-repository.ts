import PaginatedData from "@infra/utils/paginated-data";
import User from "./user";
import PaginationOptions from "@infra/utils/pagination-options";
import BaseRepository from "../base/Ibase-repository";
import { Option } from "oxide.ts";

type getByQueryOptions = {
    paginationOptions: PaginationOptions;
    query: string;
};
export default interface IUserRepository extends BaseRepository<User> {
    getByQuery?({
        paginationOptions,
        query,
    }: getByQueryOptions): Promise<PaginatedData<User[]>>;

    getByEmail(email: string): Promise<Option<User>>;

    getById(entityId: string): Promise<Option<User>>;

    calculateAge(entityId: string): Promise<Option<number>>;
}
