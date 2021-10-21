import { Draggable, Droppable} from "react-beautiful-dnd";

export default function Participants(props){
    return (
    <div>
            <Droppable droppableId="participants">
                {(provided, snapshot) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {props?.participants.map((participant, index) => (
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
    </div>
    );
}