import React from 'react';

export default class NewBookmarkForm extends React.Component{
 constructor(props){
     super(props);
     this.state = {
         title: ''};

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
 }

    handleChange(e) {
        this.setState({title: e.target.value});
    }

    handleSubmit(e) {
        alert('title submitted: ' + this.state.title)
        e.preventDefault();
        // const newBookmark = {

        // }

        this.setState(prevState => {
            let bookmarks = Object.assign({}, prevState.bookmarks);
            bookmarks.title = this.state.title;
            return { bookmarks};
        })
    }

    // bookmarks: {
    //     'bookmark-1': { 
    //       id: 'bookmark-1',
    //       title: 'url number 1 title', 
    //       url: 'test.com', 
    //       tag: "qa", 
    //       notes: "this is where you enter notes" },
    //     'bookmark-2': { id: 'bookmark-2', title: 'url number 2 title', url: 'test2.com', tag: "es6" },
    //     'bookmark-3': { id: 'bookmark-3', title: 'url number 3 title', url: 'test3.com', tag: "react" },
    //     'bookmark-4': { id: 'bookmark-4', title: 'url number 4 title', url: 'test4.com', tag: "js" },
    //   },

    render(){
        return(
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="name" value={this.state.title} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
            </form>
        </div>
        )
    }
}