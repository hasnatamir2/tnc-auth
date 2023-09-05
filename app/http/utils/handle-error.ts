import HttpException from "@infra/errors/http-exception";
import logger from "@infra/logger";

const handleError = async (error, res, req) => {
    logger.error(error);

    if (error instanceof HttpException) {
        return res.status(error.status).send({
            status: "error",
            message: error.message,
        });
    }

    return res
        .status(
            error.status && typeof error.status === "number"
                ? error.status
                : 500
        )
        .send({
            status: "error",
            message: error.message || "unknown error",
        });
};

export default handleError;
