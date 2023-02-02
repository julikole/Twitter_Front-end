import { Component } from "react";
import { Link } from "react-router-dom";
import { getFormattedTime } from "../utils/date";


class Tweet extends Component {
  render() {
    const tweet = this.props.tweetInfo;
    const { name, message, username, created_at } = tweet;

    const tweetItemStyles = {
      padding: "10px",
      border: "0.5px solid gray",
      borderRadius: "7px",
      width: "75%",
      margin: "10px auto 10px auto",
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