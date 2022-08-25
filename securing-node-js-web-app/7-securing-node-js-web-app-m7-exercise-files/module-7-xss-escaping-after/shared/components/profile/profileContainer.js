"use strict";


import React, {PropTypes, Component}    from "react";
import {bindActionCreators}             from "redux";
import Profile                          from "./profileComponent";
import EditProfileForm                  from "./editProfileComponent";
import {connect}                        from "react-redux";
import * as authActions                 from "../../actions/authenticationActions";

class ProfileContainer extends Component {
    constructor(props) {
        super(props);

        this.onEditProfile = this.onEditProfile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onEditProfile() {
        const {userProfileActions} = this.props;
        userProfileActions.editUserProfile(true);
    }

    onSubmit(formData) {
        const {userProfileActions} = this.props;
        event.preventDefault();
        userProfileActions.updateUserProfile(formData);
    }


    render() {
        const {user, editProfile} = this.props;

        return (
            <div className="area-container flex-column">
                {
                    !editProfile && <Profile user={user} onEditProfile={this.onEditProfile}/>
                }
                {
                    editProfile && <EditProfileForm onSubmit={this.onSubmit}/>
                }
            </div>
        )
    }
}

ProfileContainer.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {userDataState: {user, editProfile}} = state;
    return {
        user,
        editProfile
    }
};

function mapDispatchToProps(dispatch) {
    return {
        userProfileActions: bindActionCreators(authActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);