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
import validationSchemaConfig       from "./configurations/validationSchemaConfig";
import webpackConfig                from "../webpack.config.dev.js";
import open                         from "open";
import React                        from "react";
import expressValidator             from "express-validator";


const host = "localhost";
const port = 7000;
const app = express();
const compiler = webpack(webpackConfig);

staticResourcesConfig(app);
sessionManagementConfig(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(bodyParser.json());

validationSchemaConfig(app);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
}));

app.use(require("webpack-hot-middleware")(compiler));

apiRouteConfig(app);

initialize()
    .then(function () {
        app.listen(port, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Express server listening at http://${host}:${port}`);
                open(`http://${host}:${port}`);
            }
        });
})
    .catch(function (err) {
        console.log(err);
    });


