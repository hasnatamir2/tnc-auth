import { mongo } from "mongoose";

class BaseEntity {
    public createdAt: Date = new Date();
    public updatedAt: Date = new Date();

    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
    }

    setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt;
    }

    toObj() {
        return JSON.parse(JSON.stringify(this));
    }
}

export default BaseEntity;
