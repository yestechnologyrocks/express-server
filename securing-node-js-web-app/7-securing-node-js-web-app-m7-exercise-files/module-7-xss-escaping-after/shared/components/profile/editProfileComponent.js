"use strict";

import React, {Component, PropTypes}            from "react";
import {Field, reduxForm}                       from "redux-form";
import RenderField                              from "../common/renderFieldComponent";
import {connect}                           from "react-redux";

const EditProfileForm = ({handleSubmit, onSubmit, errors}) => {
    return (
        <div className="profile-details centered">
            <div className="area-container_banner">
                <i className="fa fa-user fa-4x"></i>
                <h2>Edit Profile</h2>
            </div>
            <div className="area-container_body">
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Field name="firstName" component={RenderField} type="text" placeholder="First Name (optional)"
                               className="form-control" label="First Name" tabIndex="1" focusField="firstName"
                        />
                        <Field name="lastName" component={RenderField} type="text" placeholder="Last Name (optional)"
                               className="form-control" label="Last Name" tabIndex="1" focusField="lastName"
                        />
                        <Field name="displayName" component={RenderField} type="text"
                               placeholder="Display Name (optional)"
                               className="form-control" label="Display Name" tabIndex="1" focusField="displayName"
                        />
                        {errors &&
                        errors.map((error, i) => {
                            return <div key={i} className="error"><span>{error.msg}</span></div>
                        })
                        }
                        <button className="btn btn-primary" tabIndex="6">Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

EditProfileForm.propTypes = {
    errors: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    const {userDataState: {user}} = state;
    return {
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: user.displayName
        }
    }
};


export default connect(mapStateToProps)(reduxForm({
        form: "editProfileForm",
    },
    mapStateToProps
)(EditProfileForm));

