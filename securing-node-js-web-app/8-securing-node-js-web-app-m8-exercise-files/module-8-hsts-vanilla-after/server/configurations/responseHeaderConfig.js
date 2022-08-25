"use strict";

const responseHeaderConfig = (app) => {
    app.use((req, res, next) => {
        const maxAge = 60 * 60 * 24 * 365;

        res.set("Strict-Transport-Security", `max-age=${maxAge}; includeSubdomains; preload`);

        next();
    });
};

export default responseHeaderConfig;
