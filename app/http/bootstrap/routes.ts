import globalErrorHandler from "../middlewares/global-error-middleware";

import app from "./app";

import userRoutes from "../routes/api/v1/user-routes";

const apiVersion = "/api/v1";

app.use(`${apiVersion}/user`, userRoutes);

app.use("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "not found",
    });
});

app.use(globalErrorHandler);
