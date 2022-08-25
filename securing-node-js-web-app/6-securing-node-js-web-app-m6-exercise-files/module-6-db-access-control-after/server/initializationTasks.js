"use strict";
import {getTimelineItemModel, getUserModel, getEventVoteModel} from "./data_access/modelFactory";
import timelineItems           from "./data/timelineItems-seed";
import Promise                  from "bluebird";

const fs = Promise.promisifyAll(require("fs"));

export const initialize = async() => {
    try {
        await seedTimelineEvents();
        return await seedUsersAndVotes();
    } catch (err) {
        throw err;
    }
};

const seedTimelineEvents = async() => {
    const TimelineItemAdd = await getTimelineItemModel("timelineItem", "create");
    const timelineItemsExists = await TimelineItemAdd.count({});

    try {
        if (!timelineItemsExists) {
            let timelineItemModels = timelineItems.map(function (i) {
                i.details = i.details.split("\n\n");
                return new TimelineItemAdd(i);
            });

            await TimelineItemAdd.insertMany(timelineItemModels);
        }
    } catch (err) {
        throw err;
    }
};

const seedUsersAndVotes = async() => {
    const UserAdd = await getUserModel("user", "create");
    const UserAdmin = await getUserModel("user", "admin");

    const EventVoteAdd = await getEventVoteModel("eventVote", "create");
    const TimelineItemQuery = await getTimelineItemModel("timelineItem", "query");
    const usersExists = await UserAdmin.count({});
    const usersData = JSON.parse(await fs.readFileAsync("server/data/users.json", "utf-8"));

    try {
        if (usersExists)  return;

        let users = usersData.map(function (u) {
            return new UserAdd(u);
        });

        const min = 1;
        const max = await TimelineItemQuery.count({});
        const userDocs = await Promise.all(users.map(function(user) {
            return user.save();
        }));

        userDocs.map(async(user) => {
            const shouldVote = Math.round(Math.random());

            if (shouldVote) {
                const eventId = getRandomInt(min, max);
                const eventVote = new EventVoteAdd({
                    eventId,
                    voter: user._id,
                    voteType: "popular",
                });

                await eventVote.save(eventVote);
            }
        });

    } catch (err) {
        throw err;
    }
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * ((max - min + 1)) + min);
}