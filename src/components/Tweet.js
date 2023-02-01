import { Component } from "react";
import { Link } from "react-router-dom";
import { getFormattedTime } from "../utils/date";


class Tweet extends Component {
  render() {
    const tweet = this.props.tweetInfo;
    const { name, message, username, created_at } = tweet;

    const tweetItemStyles = {
      padding: "10px",
      border: "1px solid black",
      margin: 10,
    };

    const userLink = (
        <Link to={`/user/${username}`}>
            @{username}
        </Link>
    )

    return (
      <div  style={tweetItemStyles}>
        <p>{name} ({userLink}) {getFormattedTime(created_at)}</p>
        <p>{message}</p>
      </div>
    );
  }
}

export default Tweet;