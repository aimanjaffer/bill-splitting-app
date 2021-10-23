import { useEffect } from "react";
import { Draggable, Droppable} from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
export default function Participants(props){
    const { register, handleSubmit, getValues, reset, formState } = useForm();
    const formSubmissionHandler = (data, event) => {
        console.log({ name: getValues('participantName')});
        props.addParticipant({ name: getValues('participantName')});
    }
    useEffect(()=>{
        for (const [key, value] of Object.entries(props.contributions)) {
            console.log(`${key}: ${value}`);
          }
    },[props.contributions]);
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
          reset({ participantName: '' });
        }
      }, [formState, reset]);
    return (
    <>
    <div className="p-2 bg-gray-800 rounded-lg">
            <Droppable droppableId="participants">
                {(provided, snapshot) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {props?.participants.map((participant, index) => (
                        <Draggable key={participant.name} draggableId={participant.name} index={index}>
                            {(provided, snapshot) => (
                                <li className="rounded-lg hover:bg-gray-700 hover:shadow-xl text-xl text-white p-2 font-semibold" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{participant.name}</li>
                            )}
                        </Draggable>
                    ))}
                    <li>{provided.placeholder}</li>
                </ul>
                )}
            </Droppable>
            <form onSubmit={handleSubmit(formSubmissionHandler)}>
                <input autoComplete="off" className="ml-2 p-2 rounded-lg shadow-md hover:shadow-xl" type="text" {...register("participantName", { required: true, pattern: /^[A-Za-z0-9 ]+$/i })}/>
                <button className="ml-2 bg-green-700 p-2 rounded-lg hover:bg-green-600 hover:shadow-xl text-white" type="submit">Add Participant</button>
            </form>
    </div>
    <div className="bg-gray-800 rounded-lg p-2 text-2xl text-white">
        {<p>Total Bill Amount: {props.total}</p>}
    </div>
    <div className="bg-gray-700 rounded-lg p-2 text-2xl text-white">
        {props.contributions && Object.keys(props.contributions).map((key, index) => <p key={key}>{key}'s required contribution is ₹{props.contributions[key]}/-</p>)}
    </div>
    </>
    );
}