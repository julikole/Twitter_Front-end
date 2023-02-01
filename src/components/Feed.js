import { Component } from "react";
import Tweet from './Tweet';
import ErrorMessage from "./ErrorMessage";
import { getTweets, createTweet } from '../services/tweets';

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
            isLoading: true,
            error: null,
            newTweetText: '',
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
        const { tweets, error, isLoading, newTweetText } = this.state;

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
                <h1>Feed</h1>
                <div>
                    <label>
                        Write a new tweet:
                        <div>
                            <textarea
                                rows="3"
                                value={newTweetText}
                                onChange={this.handleChangeNewTweetText.bind(this)} />
                        </div>
                    </label>
                    <button onClick={this.handleSubmitNewTweet.bind(this)}>
                        Submit tweet
                    </button>
                </div>
                <div>{allTweets}</div>
            </main>

        )
    }
}

export default Feed;