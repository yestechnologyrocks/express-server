"use strict";


import React, {PropTypes, Component}       from "react";
import {connect}                           from "react-redux";
import {bindActionCreators}                from "redux";
import * as usersActions                    from "../../actions/adminActions";
import UsersComponent                      from "./userComponent";

class Admin extends Component {
    constructor(props) {
        super(props);

        this.removeUser = this.removeUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    removeUser(user) {
        const {usersActions} = this.props;
        if(user && user.email){
            usersActions.removeUser(user);
        }
    }

    static fetchData = [
        (page) => {
            const p = page || 1;
            return usersActions.getUsers(p);
        }
    ];

    getUsers(page) {
        const {usersActions, totalPages} = this.props;
        const pg = page > 1 && page < totalPages ? page : 1;
        usersActions.getUsers(pg);
    }

    componentDidMount() {
        const {users} = this.props;
        const {page = 1} = this.props.location.query;
        if (!users || !users.length) {
            this.getUsers(page);
        }
    }


    render() {
        const {users, page, totalPages} = this.props;
        return (
           <div className="admin">
              <UsersComponent users={users} page={page} totalPages={totalPages} removeUser={this.removeUser} getUsers={this.getUsers}/>
           </div>
        )
    }
}

Admin.proptypes = {
    users: PropTypes.array
};

function mapStateToProps(state) {
    const {adminState} = state;
    return {
        users: adminState.users,
        totalPages: adminState.totalPages,
        page: adminState.page
    }
}

function mapDispatchToProps(dispatch) {
    return {
        usersActions: bindActionCreators(usersActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);