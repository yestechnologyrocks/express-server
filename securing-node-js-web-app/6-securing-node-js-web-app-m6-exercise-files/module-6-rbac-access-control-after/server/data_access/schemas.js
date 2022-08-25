"use strict";

import mongoose         from "mongoose";
import Promise          from "bluebird";

const bcrypt = Promise.promisifyAll(require("bcrypt"));

const Schema = mongoose.Schema;

const EventVoteSchema = new Schema({
    eventId: {
        type: Number,
        ref: "TimelineItem",
        require: true,
        min: 1,
    },
    voteType: {
        type: String,
        require: true
    },
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

EventVoteSchema.index({voteType: String, voter: String});
export {EventVoteSchema as EventVoteSchema};

export const TimelineItemSchema = new Schema({
    _id: Number,
    name: String,
    short: String,
    group: String,
    content: String,
    start: Date,
    end: Date,
    timelineEvents: Array,
    details: [],
    records: {
        type: Number,
        default: 0
    },
    breachType: String,
    sources: Array,
    targets: String,
    affiliations: String,
    hidden: {
        type: Boolean,
        default: false,
    }
});

const UserSchema = new Schema({
    firstName: {
        type: String,
        match:/^[a-zA-Z ,.'-]+/,
        maxLength: 200
    },
    lastName: {
        type: String,
        match:/^[a-zA-Z ,.'-]+/,
        maxLength: 200
    },
    username: {
        type: String,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
        minlength: 12
    },
    email: {
        type: String,
        require: true,
        match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    },
    created: {
        type: Date,
        required: true,
        default: new Date()
    },
    roles: {
        type: Array,
        default: ["user"]
    }
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const hash = await bcrypt.hashAsync(this.password, 12);

        this.password = hash;
        next();

    } catch (err) {
        next(err);
    }
});

UserSchema.methods.passwordIsValid = function (password) {
    try {
        return bcrypt.compareAsync(password, this.password);
    }
    catch (err) {
        throw err;
    }
};

export {UserSchema as UserSchema};