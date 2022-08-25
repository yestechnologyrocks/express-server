"use strict";

const httpsRedirectConfig = (app) => {
    app.all("*", ((req, res, next) => {
        res.redirect(307, `https://hackershall.com${req.url}`);
        next();
    }));
};

export default httpsRedirectConfig;