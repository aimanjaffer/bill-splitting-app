import { useEffect } from "react";
import { Draggable, Droppable} from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
export default function Participants(props){
    const { register, handleSubmit, getValues, reset, formState } = useForm();
    const formSubmissionHandler = (data, event) => {
        console.log({ name: getValues('participantName')});
        props.addParticipant({ name: getValues('participantName')});
    }
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
          reset({ participantName: '' });
        }
      }, [formState, reset]);
    return (
    <div>
            <Droppable droppableId="participants">
                {(provided, snapshot) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {props?.participants.map((participant, index) => (
                        <Draggable key={participant.name} draggableId={participant.name} index={index}>
                            {(provided, snapshot) => (
                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{participant.name}</li>
                            )}
                        </Draggable>
                    ))}
                    <li>{provided.placeholder}</li>
                </ul>
                )}
            </Droppable>
            <form onSubmit={handleSubmit(formSubmissionHandler)}>
                <input type="text" {...register("participantName", { required: true, pattern: /^[A-Za-z0-9 ]+$/i })}/>
                <button type="submit">Add Participant</button>
            </form>
    </div>
    );
}