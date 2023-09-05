import PaginationOptions from "@infra/utils/pagination-options";
import PaginatedData from "@infra/utils/paginated-data";
import { Option } from "oxide.ts";

export interface CriteriaOptions {
    paginationOptions: PaginationOptions;
    query?: any;
}

export default interface BaseRepository<T> {
    add(entity: T): Promise<Option<boolean>>;
    getById(entityId: string, options?: any): Promise<Option<T>>;
    getAll?({
        paginationOptions,
        query,
    }: CriteriaOptions): Promise<PaginatedData<T>>;
    update(entity: T): Promise<boolean>;
    delete(entityId: string): Promise<boolean>;
}
