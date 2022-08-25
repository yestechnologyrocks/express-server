"use strict";
import React, {PropTypes}       from "react";
import moment                   from "moment";

const Users = ({users, page, totalPages, removeUser, getUsers}) => {
    return (
        <div className="users-list">
            <table width="80%">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Created On</th>
                    <th></th>
                </tr>
                <tr>
                    <td className="text-align-left">
                        {page > 1 &&
                        <button className="btn btn-primary page-button" onClick={() => getUsers(page-1)}><i
                            className="fa fa-backward fa-2x"></i></button>
                        }
                    </td>
                    <td colSpan="3">{page} / {totalPages}</td>
                    <td className="text-align-right page-button">
                        {page < totalPages &&
                        <button className="btn btn-primary" onClick={() => getUsers(page+1)}><i
                            className="fa fa-forward fa-2x"></i></button>
                        }
                    </td>
                </tr>
                </thead>
                <tbody>
                {users && users.length && users.map((user, i) => {
                    const date = `${moment(user.created).format("MMMM Do YYYY")}`;
                    return (
                        <tr key={i}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{date.toString()}</td>
                            <td>
                                <button className="btn btn-primary" onClick={()=>removeUser(user)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
                <tfoot>
                <tr>
                    <td className="text-align-left">
                        {page > 1 &&
                        <button className="btn btn-primary page-button" onClick={() => getUsers(--page)}><i
                            className="fa fa-backward fa-2x"></i></button>
                        }
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-align-right">
                        {page < totalPages &&
                        <button className="btn btn-primary page-button" onClick={() => getUsers(++page)}><i
                            className="fa fa-forward fa-2x"></i></button>
                        }
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    )
}

Users.prototype = {
    users: PropTypes.object
};

export default Users;