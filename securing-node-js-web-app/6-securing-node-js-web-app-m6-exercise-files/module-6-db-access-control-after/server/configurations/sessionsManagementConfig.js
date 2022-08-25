"use strict";
import connectionProvider           from "../data_access/connectionProvider";
import {serverSettings}             from "../settings";
import session                      from "express-session";
import mongoStoreFactory            from "connect-mongo";
import Promise                  from "bluebird";

const fs = Promise.promisifyAll(require("fs"));

const getAccount = async () => {
    const accounts = JSON.parse(await fs.readFileAsync("db.config.json", "utf-8"));
    return accounts["sessions"]["admin"];
};


export default async function sessionManagementConfig(app) {

    session.Session.prototype.login = function (user, cb) {
       const req = this.req;
        req.session.regenerate(function(err){
            if (err){
                cb(err);
            }
        });
        req.session.userInfo = user;
        cb();
    };

    const MongoStore = mongoStoreFactory(session);
    const creds = await getAccount();
    app.use(session({
        store: new MongoStore({
            dbPromise: connectionProvider(serverSettings.serverUrl, serverSettings.database, creds),
            ttl: (1 * 60 * 60)
        }),
        secret: serverSettings.session.password,
        saveUninitialized: true,
        resave: false,
        cookie: {
            path: "/",
            httpOnly: true,
            secure: false
        },
        name: "id"
    }));
}
