"use strict";

// ====================
//   /api/timeline
// ====================

/* eslint-disable no-console */

import React                         from "react";
import {Router}                      from "express";
import {getTimelineItemModel}        from "../data_access/modelFactory";
import colors                        from "colors";
import {timelineRangeSchema}         from "../validation/validationSchemas";

const timelineRouter = Router();

timelineRouter.route("/api/timeline")
    .get(async function (req, res) {
        try {
            const {startDate, endDate, search} = req.query;
            const query = { hidden: false };
            if (startDate && endDate) {
                query["start"] = {$gte: startDate};
                query["end"] = {$lte: endDate};
            }

            if (search) {
                query["name"] = {$regex: `${search}`, $options: "i"};
            }

            const TimelineItem = await getTimelineItemModel();
            const timelineItems = await TimelineItem.find(query).exec();

            res.json({
                timelineItems: timelineItems,
                search: search
            });
        } catch (error) {
            res.status(500).send("There was an error retrieving timeline items.  Please try again later");
        }
    });

timelineRouter.route("/api/timeline");

export default timelineRouter;

