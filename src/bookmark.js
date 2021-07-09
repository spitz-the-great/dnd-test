import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
 border: 1px solid lightgrey;
 border-radius: 2px;
 padding: 8px;
 margin-bottom: 8px;
 background-color: ${props => (props.isDragDisabled ? 'lightgrey' : props.isDragging ? '#CCF2F7' : 'white')};
 display: flex;
`;

// const Handle = styled.div`
//     width: 20px;
//     height: 20px;
//     background-color: orange;
//     border-radius: 4px;
//     margin-right: 8px;
// `;



export default class Bookmark extends React.Component{
 

    render() {

        //const isDragDisabled = this.props.bm.id === 'bm-1';

        return (
        // snapshot argument contains properties to style component during drag. see example-snapshot.js
        // Handle allows you to specify where the drag can start from
        // i.e. an inline button instead of the entire line/content, and control it further
        <Draggable 
            draggableId={this.props.bm.id} 
            index={this.props.index}
         >
                {(provided, snapshot) => (
                <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
                
                >
                
                {/*<Handle /> */}
                    {this.props.bm.title}
                    <br />
                    {this.props.bm.url}
                    <button>Delete</button>

                </Container>
            )}
        </Draggable>
        );
    }
}