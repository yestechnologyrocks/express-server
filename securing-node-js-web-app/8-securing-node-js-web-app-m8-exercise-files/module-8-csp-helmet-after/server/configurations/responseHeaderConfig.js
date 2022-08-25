"use strict";

import helmet       from "helmet";

const responseHeaderConfig = (app) => {
    app.use(helmet.hsts({
        maxAge: 1000 * 60 * 60 * 24 * 365,
        includeSubdomains: true,
        preload: true
    }));

    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", "https"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "https", "data:"],
            fontSrc: ["'self'", "https", "https://fonts.gstatic.com", "data:"],
            connectSrc: ["'self'", "https"],
            reportUri: "/cspviolation"
        },
    }));
};

export default responseHeaderConfig;