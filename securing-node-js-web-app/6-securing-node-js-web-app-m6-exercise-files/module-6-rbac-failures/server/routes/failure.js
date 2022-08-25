"use strict";

import {Router}                                 from "express";
import { getUserModel }                         from "../data_access/modelFactory";
import RBAC                                     from "../data_access/rbac";

const adminRouter = Router();
const rbac = new RBAC();
const userAdministrationRoute = adminRouter.route("/api/admin/users");

//Validate Admin Access
userAdministrationRoute.get(async function(req, res, next) {
    const user = await acquireUser(req);
    rbac.check(user).is("admin", function (err, results) {
        if (!results){
            return res.sendStatus(401);
        }
        next();
    });
});

// List Users
userAdministrationRoute.get(async function (req, res) {
        try {
            const paginationInfo = await getPaginationInformaiton(req);
            return res.json(paginationInfo);
        } catch (err) {
            return res.status(500).send("There was an error retrieving the list of users");
        }
    });

// Delete User
adminRouter.delete(async function (req, res) {
        try {
            const user = await getUser(req);

            if (user) {
                await User.remove({email: email});
                return res.sendStatus(200);
            } else {
                return res.status(404).send("The requested user does not exist.");
            }
        }
        catch (err) {
            return res.status(500).send("There was an error attempting to remove user");
        }
    });

async function acquireUser(req){
    const User = await getUserModel();
    const {userInfo = {}} = req.session;
    return await User.findOne({_id: userInfo._id});
}

async function getPaginationInformaiton(req){
    const pageSize = 50;
    const {page} = req.query;
    const skip = page > 1 ? page * 50 : 0;
    const User = await getUserModel();
    const totalUsers = await User.count();
    const totalPages = Math.floor((totalUsers + pageSize - 1) / pageSize);

    const users = await User.find({}, "firstName lastName email created", {skip: skip, limit: 50}) || [];
    return {users, totalPages};
}

async function getUser(req) {
    const {email} = req.body;
    const User = await getUserModel();
    return await User.find({email: email});
}
export default adminRouter;