"use strict";
/* eslint-disable no-console */

require("../shared/lib/extensions");
import express, {Router}            from "express";
import bodyParser                   from "body-parser";
import {initialize}                 from "./initializationTasks";
import webpack                      from "webpack";
import sessionManagementConfig      from "./configurations/sessionsManagementConfig";
import apiRouteConfig               from "./configurations/apiRoutesConfig";
import httpsRedirectConfig          from "./configurations/httpsRedirectConfig";
import responseHeaderConfig         from "./configurations/responseHeaderConfig";
import staticResourcesConfig        from "./configurations/staticResourcesConfig";
import webpackConfig                from "../webpack.config.dev.js";
import open                         from "open";
import React                        from "react";
import expressValidator             from "express-validator";
import fs                           from "fs";
import https                        from "https";

const host = "hackershall.com";
const sslPort = 443;
const insecurePort = 80;
const app = express();
const redirectApp = express();
const compiler = webpack(webpackConfig);


const options = {
    key: fs.readFileSync("server/data/hackershall.key"),
    cert: fs.readFileSync("server/data/hackershall.crt")
};

httpsRedirectConfig(redirectApp);
responseHeaderConfig(app);
staticResourcesConfig(app);
sessionManagementConfig(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});


app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
}));

app.use(require("webpack-hot-middleware")(compiler));

/* routing */
apiRouteConfig(app);

initialize()
    .then(function () {
        redirectApp.listen(insecurePort, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Express server listening at http://${host}:${insecurePort}`);
                open(`http://${host}:${insecurePort}`);
            }
        });
        https.createServer(options, app).listen(sslPort);

})
    .catch(function (err) {
        console.log(err);
    });


