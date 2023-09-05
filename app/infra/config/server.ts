export default {
    PORT: Number(process.env.PORT) || 4005,
    APP_NAME: process.env.APP_NAME || "tnc-solutions",
    NODE_ENV: process.env.NODE_ENV,
    SECRET: process.env.SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
