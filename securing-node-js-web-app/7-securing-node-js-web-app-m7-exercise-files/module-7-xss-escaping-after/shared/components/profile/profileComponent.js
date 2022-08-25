"use strict";


import React, {PropTypes}               from "react";

const ProfileComponent = ({user, onEditProfile}) => {

    return (
        <div className="profile-details centered">
            <div className="area-container_banner">
                <h2>My Profile</h2>
                <i onClick={onEditProfile} className="fa fa-pencil-square-o fa-4x"></i>
            </div>
            <div className="area-container_body ">
                <table className="table">
                    <tbody>
                    <tr>
                        <td>First Name:</td>
                        <td>{user.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td>{user.lastName}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>Display Name:</td>
                        <td>{user.displayName}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
    };

    export default ProfileComponent;