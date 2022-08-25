"use strict";

import {TimelineItemSchema, UserSchema, EventVoteSchema}         from "./schemas";
import connectionProvider                                        from "./connectionProvider";
import {serverSettings}                                          from "../settings";
import Promise                  from "bluebird";

const fs = Promise.promisifyAll(require("fs"));

export const getUserModel = async function (col, perm) {
    try {
        const accounts = JSON.parse(await fs.readFileAsync("db.config.json", "utf-8"));
        const creds = accounts[col][perm];
        const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database, creds);
        return conn.model("User", UserSchema);
    } catch (err) {
        throw err;
    }
};

export const getTimelineItemModel = async function (col, perm) {
    try {
        const accounts = JSON.parse(await fs.readFileAsync("db.config.json", "utf-8"));
        const creds = accounts[col][perm];
        const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database, creds);
        return conn.model("TimelineItem", TimelineItemSchema);
    } catch (err) {
        throw err;
    }
};

export const getEventVoteModel = async function(col, perm) {
    try {
        const accounts = JSON.parse(await fs.readFileAsync("db.config.json", "utf-8"));
        const creds = accounts[col][perm];
        const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database, creds);
        return conn.model("EventVote", EventVoteSchema);
    } catch(err) {
        throw err;
    }
};