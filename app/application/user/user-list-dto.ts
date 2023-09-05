import PaginationOptions from "@infra/utils/pagination-options";

class UserListDTO {
    private readonly paginationOptions: PaginationOptions;
    private readonly query: any;

    constructor(request) {
        const { page, limit, ...query } = request;
        const paginationOptions = new PaginationOptions(page, limit);
        this.paginationOptions = paginationOptions;
        this.query = query;
    }

    getPaginationOptions() {
        return this.paginationOptions;
    }

    getQuery() {
        return this.query;
    }
}

export default UserListDTO;
