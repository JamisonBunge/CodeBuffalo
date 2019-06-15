import React, { Component } from 'react';
import { graphql } from 'react-apollo'
//import { getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';
// import { getBookQuery } from '../queries/queries'


class FeedCard extends Component {

    feedDetails() {
        // const {feed} = this.props.data;
        // if(feed) {
        //     return(
        //         <div>
        //             <h2>{feed.name}</h2>
        //             <p>{feed.genre}</p>
        //             <p>{feed.author.name}</p>
        //             <p>All feeds by this author:</p>
        //         </div>
        //     )
        // } else {
        //     return (
        //         <div>No feed selected</div>
        //     )
        //
        // }
        return (
            <div>No feed selected</div>
        )
    }

    render() {
        console.log(this.props)
        return(
            <div id="book-details">
                {this.feedDetails()  }
            </div>
        );
    }

}

export default FeedCard;
//binding this to a component means that whenever this compondent renders this query qill be made
