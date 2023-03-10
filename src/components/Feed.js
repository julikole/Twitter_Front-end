import { Component } from "react";
import Tweet from './Tweet';
import ErrorMessage from "./ErrorMessage";
import { getTweets, createTweet } from '../services/tweets';
import jwtDecode from "jwt-decode";
import UserFeed from "./UserFeed";
import { Link } from "react-router-dom";

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
            isLoading: true,
            error: null,
            newTweetText: '',
            user: {},
        };
    }

    handleChangeNewTweetText(event) {
        this.setState({
            newTweetText: event.target.value
        });
    }

    async handleSubmitNewTweet() {
        const { newTweetText } = this.state;

        // POST / create new tweet through API
        await createTweet(newTweetText);

        // Clear text area
        this.setState({ newTweetText: '' });

        // Refetch tweets
        this.handlePopulateTweets();
    }

    async componentDidMount() {
        const { history } = this.props;
        // Check if we have a token in local storage
        const token = localStorage.getItem('TWITTER_TOKEN');

        // If not - redirect to /login
        if (!token) {
            history.replace('/login');
            return;
        }
        // Else - get info from token and show in UI
        const payload = jwtDecode(token);
        this.setState({
            user: payload
        });

        // Fetch tweets from server
        await this.handlePopulateTweets();
    }

    async handlePopulateTweets() {

        this.setState({
            isLoading: true,
            error: null,
        })

        try {
            const tweets = await getTweets()

            this.setState({
                tweets: tweets,
                isLoading: false,
            });
        } catch (error) {
            this.setState({
                error: error,
            })
        }

    }

    render() {
        const { tweets, error, isLoading, newTweetText, user } = this.state;

        if (error) {
            return (
                <ErrorMessage
                    message={error.message}
                    onRetry={this.handlePopulateTweets.bind(this)}
                />
            );
        }

        if (isLoading) {
            return (
                <div>Loading tweets...</div>
            );
        }

        const allTweets = tweets.map((tweet) => {
            return (
                <Tweet key={tweet.id} tweetInfo={tweet} />
            )
        });

        return (
            <main>
                <h1>Feed (logged in as {user.name})</h1>
                <Link to="/logout">Log out</Link>
                <div>
                    <label>
                        Write a new tweet:
                        <div>
                            <textarea
                                rows="4"
                                cols="40"
                                value={newTweetText}
                                onChange={this.handleChangeNewTweetText.bind(this)} />
                        </div>
                    </label>
                    <button onClick={this.handleSubmitNewTweet.bind(this)}>
                        Publish tweet
                    </button>
                </div>
                <div>{allTweets}</div>
            </main>

        );
    }
}

export default Feed;