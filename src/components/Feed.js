import { Component } from "react";
import Tweet from './Tweet'
import { getTweets } from '../services/tweets'

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
            isLoading: false,
            error: null
        };
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
        const { tweets, error, isLoading } = this.state;
        const allTweets = tweets.map((tweet) => {
            return ( 
                <Tweet tweetInfo={tweet} />
            )
        })
        
        if (error) {
            <div>
                <h3>Unable to fetch tweets: {error.message}</h3>
                <button onClick={this.handlePopulateTweets.bind(this)}></button>
                Retry
            </div>
        }

        if (isLoading) {
            return (
                <div>Loading tweets...</div>
            );
        }
        return (
            <main>
                <div>Feed</div>
                <div>
                    {allTweets}
                </div>
            </main>

        )
    }
}

export default Feed;