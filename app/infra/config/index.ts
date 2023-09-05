import * as dotenv from "dotenv";
dotenv.config();

import server from "./server";
import database from "./database";

export default {
    server,
    database,
};
