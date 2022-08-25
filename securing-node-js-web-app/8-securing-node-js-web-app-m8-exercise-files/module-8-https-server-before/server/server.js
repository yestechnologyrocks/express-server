"use strict";
/* eslint-disable no-console */

require("../shared/lib/extensions");
import express, {Router}            from "express";
import bodyParser                   from "body-parser";
import {initialize}                 from "./initializationTasks";
import webpack                      from "webpack";
import sessionManagementConfig      from "./configurations/sessionsManagementConfig";
import apiRouteConfig               from "./configurations/apiRoutesConfig";
import staticResourcesConfig        from "./configurations/staticResourcesConfig";
import webpackConfig                from "../webpack.config.dev.js";
import open                         from "open";
import React                        from "react";
import expressValidator             from "express-validator";

const host = "hackershall.com";
const insecurePort = 80;
const app = express();
const compiler = webpack(webpackConfig);

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
        app.listen(insecurePort, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Express server listening at http://${host}:${insecurePort}`);
                open(`http://${host}:${insecurePort}`);
            }
        });

})
    .catch(function (err) {
        console.log(err);
    });


