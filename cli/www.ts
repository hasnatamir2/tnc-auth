import "reflect-metadata";
import app from "@http/bootstrap";
import { connect } from "@infra/database/mongodb";
import logger from "@infra/logger";
import config from "@infra/config";
import { Command } from "commander";

const { server } = config;

const program = new Command();

program.command("start").action(async () => {
    try {
        await connect()
        logger.debug(`[DB]: Connected to MonoDB`);
        app.listen(server.PORT, "0.0.0.0", () =>
            logger.info(
                `[HTTP]: ${server.APP_NAME} listening on port ${server.PORT} `
            )
        );
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
});

program.parse(process.argv);
