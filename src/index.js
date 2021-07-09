import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from './column';
import styled from 'styled-components';
import NewBookmarkForm from './newBookmarkForm';

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {

  constructor(){
   super();

    this.state =  {
        bookmarks: {
          'bookmark-1': { 
            id: 'bookmark-1',
            title: 'url number 1 title', 
            url: 'test.com', 
            tag: "qa", 
            notes: "this is where you enter notes" },
          'bookmark-2': { id: 'bookmark-2', title: 'url number 2 title', url: 'test2.com', tag: "es6" },
          'bookmark-3': { id: 'bookmark-3', title: 'url number 3 title', url: 'test3.com', tag: "react" },
          'bookmark-4': { id: 'bookmark-4', title: 'url number 4 title', url: 'test4.com', tag: "js" },
        },
        columns: {
          'column-1': {
            id: 'column-1',
            title: 'Sports',
            bookmarkIds: ['bookmark-2', 'bookmark-3', 'bookmark-4'],
          },
          'column-2': {
            id: 'column-2',
            title: 'News',
            bookmarkIds: ['bookmark-1'],
          },
          'column-3': {
            id: 'column-3',
            title: 'Misc',
            bookmarkIds: [],
          },
        },
        // Facilitate reordering of the columns
        columnOrder: ['column-1', 'column-2', 'column-3'],
      };
};

  // onDragStart = () => {
  //   document.body.style.color = 'orange';
  // }

  // onDragUpdate = update => {
  //   const {destination} = update;
  //   // dynamically change bg color based on drag position
  //   const opacity = destination
  //     ? destination.index / Object.keys(this.state.bookmarks).length
  //     : 0;
  //     document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  // };

  // addNew = () =>{
  //   this.setState (prevState => ({
  //       bookmarks: [...prevState.bookmarks, {
  //       id: 'bookmark-1',
  //       title: 'url number 1 title', 
  //       url: 'test.com', 
  //       tag: "qa", 
  //       notes: "this is where you enter notes"}]
  //     }
  //   ))
  // };

  deleteBookmark = (index, e) =>{
    const bookmarks = Object.assign( [], this.state.bookmarks);
    bookmarks.splice(index, 1);
    this.setState( {bookmarks : bookmarks} );
    console.log(index);
  }

  onDragEnd = result => {
    // resetting bg color
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

    const {destination, source, draggableId, type } = result;
  
    if(!destination) {
      return;
    }
  
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if( type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
      this.setState(newState);
      return;
    }
  
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    // handles case where start and finish column is the same
    if (start === finish){
      const newBookmarkIds = Array.from(start.bookmarkIds);
      newBookmarkIds.splice(source.index, 1);
      newBookmarkIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        bookmarkIds: newBookmarkIds,
      };
    
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };
      
      this.setState(newState);
      return;
    }

  // handles case where start and finish columns are different
  const startBookmarkIds = Array.from(start.bookmarkIds);
  startBookmarkIds.splice(source.index, 1);
  const newStart = {
    ...start,
    bookmarkIds: startBookmarkIds,
  }

  const finishBookmarkIds = Array.from(finish.bookmarkIds);
  finishBookmarkIds.splice(destination.index, 0, draggableId);
  const newFinish = {
    ...finish,
    bookmarkIds: finishBookmarkIds,
  };

  const newState = {
    ...this.state,
    columns: {
      ...this.state.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    },
  };
  this.setState(newState);

};


  render() {
    return (
      <div>
        <NewBookmarkForm></NewBookmarkForm>
      {/*could possibly make server call at onDragEnd*/}
       <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate}>
          <Droppable 
            droppableId="all-columns" 
            direction="horizontal" 
            type="column"
          >
            {provided => (
              <Container
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                  {this.state.columnOrder.map((columnId, index) => {
                  const column = this.state.columns[columnId];
                  const bookmarks = column.bookmarkIds.map(bookmarkId => this.state.bookmarks[bookmarkId]);
                  
                  return (
                    <Column 
                      key={column.id} 
                      column={column} bookmarks={bookmarks} 
                      index={index} 
                      
                    /> 
                  );
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
      </DragDropContext>
      </div>
    );
  } 
}


ReactDOM.render(<App />, document.getElementById('root'));


