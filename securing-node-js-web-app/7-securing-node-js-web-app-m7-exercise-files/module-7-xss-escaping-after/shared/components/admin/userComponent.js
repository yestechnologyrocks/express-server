"use strict";
import React, {PropTypes}       from "react";
import moment                   from "moment";
import {Link}                   from "react-router";

const Users = ({users, page, totalPages, removeUser, getUsers}) => {
    return (
        <div className="users-list">
            <table width="80%">
                <thead>
                <tr>
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Display Name</th>
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
                    <td colSpan="5">{page} / {totalPages}</td>
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
                            <td> <Link to={`user/profile/${user.id}`}><i className="fa fa-eye fa-4x"></i></Link></td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td dangerouslySetInnerHTML={{__html: `${user.displayName}`}}></td>
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
                    <td className="text-align-right" colSpan="3">
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
};

Users.prototype = {
    users: PropTypes.object
};

export default Users;