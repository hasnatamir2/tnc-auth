import mongoose from "mongoose";
import config from "../../config";
import logger from "@infra/logger";

const { database, server } = config;
// connect to mongodb
export const connect = async () => {
    try {
        return await mongoose.connect(database.DATABASE_URL);
    } catch (error) {
        logger.error("Error connecting to MongoDB: ", error);
        throw error;
    }
};

export const disconnect = () => {
    logger.debug(server.NODE_ENV);
    if (server.NODE_ENV.toString() == "test") {
        return mongoose.connection.db.dropDatabase().then(() => {
            return mongoose.disconnect();
        });
    } else {
        return mongoose.disconnect();
    }
};

export default mongoose;
