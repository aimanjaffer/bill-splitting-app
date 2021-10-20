import { Droppable, Draggable } from "react-beautiful-dnd";

export default function Bill(props){
    return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Unit Price</th>
                    <th>Participants Involved</th>
                </tr>
            </thead>
          <tbody>
            <tr>
                <td>Chicken Biryani</td>
                <td>250</td>
                <td>
                    {/**Drop participants here */}
                    <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <ul ref={provided.innerRef}>
                            {props?.billParticipants.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            >
                                            {item.name}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            <li>{provided.placeholder}</li>
                        </ul>
                    )}
                </Droppable>
                </td>
            </tr>
            <tr>
                <td>Pizza</td>
                <td>200</td>
                <td>
                    {/**Drop participants here */}
                </td>
            </tr>
            <tr>
                <td>Nachos</td>
                <td>150</td>
                <td>
                    {/**Drop participants here */}
                </td>
            </tr>
            <tr>
                <td>Peri Peri Fries</td>
                <td>200</td>
                <td>
                    {/**Drop participants here */}
                </td>
            </tr>
          </tbody>
        </table>
    </div>);
}