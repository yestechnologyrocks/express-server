"use strict";

const responseHeaderConfig = (app) => {
    app.use((req, res, next) => {
        const maxAge = 60 * 60 * 24 * 365;

        res.set("Strict-Transport-Security", `max-age=${maxAge}; includeSubdomains; preload`);

        res.set("Content-Security-Policy", "default-src 'none'; " +
            "script-src https 'self' 'unsafe-inline'; " +
            "style-src https 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "font-src https 'self' https://fonts.gstatic.com data:;" +
            "img-src https 'self';" +
            "connect-src https 'self';" +
            "report-uri /cspviolations");

        next();
    });
};

export default responseHeaderConfig;
