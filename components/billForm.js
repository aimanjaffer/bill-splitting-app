import { useForm, useFieldArray } from "react-hook-form";
import { Droppable, Draggable } from "react-beautiful-dnd";
export default function BillForm(props) {
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
          billItem: [{ itemName: "", itemQuantity: 0, itemUnitPrice: 0 }]
        }
      });
      const { fields, append, remove } = useFieldArray({ control, name: "billItem" });
      const onSubmit = (data) => console.log("data", data);
    
      return (
        <form onSubmit={handleSubmit(onSubmit)}>         
          <ul>
            {fields.map((item, index) => (
                <li key={item.id}>
                  <input {...register(`billItem.${index}.itemName`)} />
                  <input {...register(`billItem.${index}.itemQuantity`)} />
                  <input {...register(`billItem.${index}.itemUnitPrice`)} />
                  {/**TODO: Track participants for each Bill Item and calculate each participant's required contribution*/}
                  <Droppable droppableId={""+index}>
                    {(provided, snapshot) => (
                        <ul ref={provided.innerRef}>
                            {props?.bill[index].participants.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={index+"_"+item.id}
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
                  <button type="button" onClick={() => remove(index)}>Delete</button>
                </li>
              )
            )}
          </ul>
          <section>
            <button type="button" onClick={() => append({ itemName: "", itemQuantity: 0, itemUnitPrice: 0 })}>
              Add Row
            </button>
            <button type="button" onClick={() => reset({ billItem: [{ itemName: "", itemQuantity: 0, itemUnitPrice: 0 }] })}>
              Reset
            </button>
          </section>
    
          <input type="submit" />
        </form>
      );
    }