"use strict";

import timelineRouter               from "../routes/timelineRoutes";
import authenticationRouter         from "../routes/authenticationRoutes";
import eventVoteRoutes              from "../routes/eventVoteRoutes";
import wildcardRouter               from "../routes/wildcardRoute";
import adminRouter                  from "../routes/adminRoutes";
import cors                         from "cors";

export default function ConfigApiRoutes(app) {
    app.use(cors());
    app.use(timelineRouter);
    app.use(authenticationRouter);
    app.use(eventVoteRoutes);
    app.use(adminRouter);
    app.use(wildcardRouter);
}