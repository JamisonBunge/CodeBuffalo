import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import { addEventsMutation } from '../query/query'

class AddEvent extends Component {

    constructor(props) {
        super(props);
        //this is the inital state of the form as nothing is 'by default' entered in this form
        this.state = {
            name: '',
            description: '',
            user: 'Nick M',
            score: 0
        };
    }



    displayAuthors() {
        var data = this.props.getAuthorsQuery;

        //  console.log(this.props)
        if (data.loading) {
            return <option disabled>Loading Form...</option>
        } else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id} >{author.name}</option>)
            })
        }
    }

    submitForm(e) {
        // //prevent the default 'refresh' behavior from happening
        e.preventDefault();
        this.props.addEventsMutation({
            variables: {
                name: this.state.name,
                description: this.state.description,
                user: this.state.user,
                score: this.state.score
            }//,
            //after adding this we want to tell apollo to reefatch queries
            // refetchQueries: [{ query: getBooksQuery }]
        })
        console.log(this.state)
    }

    render() {  //you bing this so that the target of the funciton is itself
        return (
            <form id="add-event" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Event Name:</label>
                    <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                </div>

                <div className="field">
                    <label>Description:</label>
                    <input type="text" onChange={(e) => this.setState({ description: e.target.value })} />
                </div>

                <button>+</button>
            </form>
        );
    }
}

// export default graphql(addEventsMutation)(AddEvent)

// export default compose(
//     graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
//     graphql(addBookMutation,{name: "addBookMutation"})
// )(AddBook);

export default compose(
    graphql(addEventsMutation, { name: "addEventsMutation" }),
)(AddEvent);