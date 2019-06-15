import React, {Component} from 'react';
import {graphql} from 'react-apollo'
import { getQuizQuery, getEventsQuery } from '../query/query';

//components
import FeedCard from './FeedCard'

class FeedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
              profile: {cat : "social"}
        }
    }

    displayFeed() {
        var data = this.props.data;
        if(data.loading|| data.getEvents == undefined) {
            return<div>Loading event...</div>
        } else {
          console.log(data);

            //data is ready, map to html and return it
            return data.getEvents.map(singleEvent => {
                console.log(singleEvent);
                return(
                    <li> {singleEvent.name} </li>
                )
            })

        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <ul id="event-list">
                    {this.displayFeed()}
                    <FeedCard />
                </ul>
            </div>
        );
    }
}


//bind booklist to getbooksquery
//the query result is stored in props
export default graphql(getEventsQuery, {
    options: (props) => {
        //console.log("+++++++++" +props.bookId)
        return {
            variables: {
                cat:  (props.profile ? props.profile.cat : "social")
            }
        }
    }
})(FeedComponent)


//how to make a query

//construct one, ( the getbooksQuery const)

//bind it to the component

//remeber graphQL is NOT js
