import { Draggable, Droppable, DragDropContext} from "react-beautiful-dnd";
import { useState } from "react";
const initialParticipants = [
    {
        id: "0",
        name: "Aiman"
    },{
        id: "1",
        name: "Pee"
    },{
        id: "2",
        name: "Vaishak"
    },{
        id: "3",
        name: "Zakki"
    },{
        id: "4",
        name: "Ullas"
    },{
        id: "5",
        name: "Vivek"
    }
];
export default function Participants(props){
    const [participants, setParticipants] = useState(initialParticipants);
    
    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(participants);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setParticipants(items);
    }
    return (
    <div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="participants">
                {(provided, snapshot) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {participants.map((participant, index) => (
                        <Draggable key={participant.id} draggableId={participant.id} index={index}>
                            {(provided, snapshot) => (
                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{participant.name}</li>
                            )}
                        </Draggable>
                    ))}
                    <li>{provided.placeholder}</li>
                </ul>
                )}
            </Droppable>
        </DragDropContext>
    </div>
    );
}