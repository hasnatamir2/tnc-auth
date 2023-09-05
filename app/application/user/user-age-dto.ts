class UserAgeDTO {
    private readonly id: string;
    constructor(request) {
        const { id } = request.decoded;
        console.log(id);
        this.id = id;
    }

    getId() {
        return this.id;
    }
}

export default UserAgeDTO;
