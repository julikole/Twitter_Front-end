import { Component } from "react";

class UserFeed extends Component {
    render() {
        const username = this.props.match.params.username;

        return (
            <div>User Feed for @{username}</div>
            
        )
    }
}

export default UserFeed;