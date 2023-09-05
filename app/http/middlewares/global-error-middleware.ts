import logger from "@infra/logger";

export default async (error, req, res, next) => {
    logger.error(error);

    return res.status(500).json({
        status: "error",
        message: "something went wrong",
        subMessage: error.message,
    });
};
