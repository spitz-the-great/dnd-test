import React from 'react';
import styled from 'styled-components';
import Bookmark from './bookmark.js';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
 margin: 8px;
 border: 1px solid lightgrey;
 border-radius: 2px;
 width: 200px;
 background-color: white;
 display: flex;
 flex-direction: column;
 `;

const Title = styled.h3`
 padding: 8px;
 color: white;
 background-color: #002677;
`;

const BookmarkList = styled.div`
 padding: 8px;
 background-color: ${props => (props.isDraggingOver ? '#00BED5' : 'inherit')};
 flex-grow: 1;
 min-height: 100px;
`;


export default class Column extends React.Component {
  

    render() {
      return (
        <Draggable draggableId={this.props.column.id} index={this.props.index}>
          {provided => (
            <Container
              {...provided.draggableProps} 
              ref={provided.innerRef}
            >
              <Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
              <Droppable droppableId={this.props.column.id} type="bm">
                {(provided, snapshot) => 
                  <BookmarkList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {this.props.bookmarks.map((bm, index) => (
                      <Bookmark 
                      key={bm.id} 
                      bm={bm} 
                      index={index} 
                      />
                    ))}
                    {provided.placeholder}
                  </BookmarkList>
                }
              </Droppable>
            </Container>
          )}
        </Draggable>
      );
    }
  }