import { Component } from "react";

class Tweet extends Component {
  render() {
    const tweet = this.props.tweetInfo;
    const {id, name, message, username, created_at} = tweet;

    const tweetItemStyles = {
      padding: "10px",
      border: "1px solid black",
      margin: 10,
    };

    return (
      <div key={id} style={tweetItemStyles}>
        <p>{name} {username} {created_at}</p>
        <p>{message}</p>
      </div>
    );
  }
}

export default Tweet;