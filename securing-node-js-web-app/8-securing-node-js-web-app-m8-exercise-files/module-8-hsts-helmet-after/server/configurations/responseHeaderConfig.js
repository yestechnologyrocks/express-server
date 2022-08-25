"use strict";

import helmet       from "helmet";

const responseHeaderConfig = (app) => {
    app.use(helmet.hsts({
        maxAge: 1000 * 60 * 60 * 24 * 365,
        includeSubdomains: true,
        preload: true
    }));
};

export default responseHeaderConfig;
