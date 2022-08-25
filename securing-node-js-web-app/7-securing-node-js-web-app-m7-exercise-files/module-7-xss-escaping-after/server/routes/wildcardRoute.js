"use strict";

import React                                from "react";
import {Router}                             from "express";
import createLocation                       from "history/lib/createLocation";
import ReactDOMServer                       from "react-dom/server";
import {RouterContext, match}               from "react-router";
import {Provider}                           from "react-redux";
import thunk                                from "redux-thunk";
import reducers                             from "../../shared/reducers";
import routes                               from "../../shared/routes";
import {getEventVoteModel, getUserModel}    from "../data_access/modelFactory";
import fetchComponentData                   from "../../shared/lib/fetchComponentData";
import {
    createStore,
    applyMiddleware
}                                           from "redux";

const wildcardRouter = Router();

wildcardRouter.route("*")
    .get(async function (req, res) {

        let user = {};
        let userVotes = [];
        if (req.session.userInfo) {
            const {email} = req.session.userInfo;
            const User = await getUserModel();

            const currentUser = await User.findOne({email: email});
            if (currentUser) {
                user = {
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    username: currentUser.userName,
                    roles: currentUser.roles,
                    id: currentUser._id,  // Insecure Direct Object Reference
                    displayName: currentUser.displayName,
                    email: currentUser.email
                };
                const EventVote = await getEventVoteModel();
                const votes = await EventVote.find({voter: currentUser._id}).exec() || [];
                userVotes = votes.map(vote => {
                    return {
                        eventId: vote.eventId,
                        voteType: vote.voteType,
                        voter: currentUser.username
                    };
                });
            }
        }

        const store = createStore(reducers, {
            userDataState: {
                user: user,
                votes: userVotes,
                editProfile: false
            }
        }, applyMiddleware(thunk));
        const location = createLocation(req.url);

        match({
            routes, location
        }, (err, redirectLocation, renderProps) => {
            if (err) {
                return res.status(500).end("Internal Server Error Occurred");
            }

            if (!renderProps) return res.status(404).end("Not Found");

            function renderView() {
                const InitialView = (
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );

                const componentHTML = ReactDOMServer.renderToString(InitialView);
                const initialState = store.getState();

                const HTML = `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="utf-8">
                    <base href="/">   
                    <script>
                        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                    </script>
                    <meta charset="UTF-8">
                    <title>Hacker's Hall</title>
                    <link rel="shortcut icon" href="favicon.ico?ver=1" />
                    <link rel="stylesheet" href="styles.css" type="text/css">             
                  </head>
                  <body>
                    <div id="app">${componentHTML}</div>
                    <script src="/bundle.js"></script>
                    <script src="http://code.jquery.com/jquery-2.2.3.min.js" crossorigin="anonymous"></script>
                  </body>
                </html>
            `;
                return HTML;
            }

            // courtesy of Milo Mordaunt - https://medium.com/@bananaoomarang
            fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
                .then(renderView)
                .then(html => {
                    res.end(html);
                })
                .catch(err => res.end(err.message));
        });
    });

export default wildcardRouter;