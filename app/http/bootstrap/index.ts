import http from "http";

import "./routes";
import app from "./app";

const server = http.createServer(app);

export default server;
