import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Droppable, Draggable } from "react-beautiful-dnd";
//import { useEffect } from "react";
export default function BillForm(props) {
  /* useEffect(() => {
    console.log("bill prop changed");
    console.log(props.bill);
  },[props.bill]); */
  
    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
          billItems: props.bill
        }
      });
      const { fields, append, remove } = useFieldArray({ control, name: "billItems" });
      const watchBillItems = watch("billItems");
      const controlledFields = fields.map((field, index) => {
        return {
          ...field,
          ...watchBillItems[index]
        };
      });
      const onChangeHandler = (e) => {
        //console.log(watchBillItems);
        props.setBill(watchBillItems);
      };
    
      return (
        <form onChange={onChangeHandler}>         
          <ul>
            {controlledFields.map((item, billIndex) => (
                <li key={item.id}>
                  <Controller render={({ field }) => <input {...field} />} name={`billItems.${billIndex}.itemName`} control={control}/>
                  <Controller render={({ field }) => <input {...field} />} name={`billItems.${billIndex}.quantity`} control={control}/>
                  <Controller render={({ field }) => <input {...field} />} name={`billItems.${billIndex}.unitPrice`} control={control}/>
                  {/**TODO: Track participants for each Bill Item and calculate each participant's required contribution*/}
                  <Droppable droppableId={""+billIndex}>
                    {(provided, snapshot) => (
                        <ul ref={provided.innerRef}>
                            {props?.bill[billIndex]?.participants?.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={billIndex+"_"+index+"_"+item.id+"_"+item.name}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            {item.name}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            <li>{provided.placeholder}</li>
                        </ul>
                    )}
                </Droppable>
                  <button type="button" onClick={() => remove(billIndex)}>Delete</button>
                </li>
              )
            )}
          </ul>
          <section>
            <button type="button" onClick={() => append({ itemName: "", quantity: 0, unitPrice: 0, participants:[] })}>
              Add Row
            </button>
            <button type="button" onClick={() => reset({ billItem: [{ itemName: "", quantity: 0, unitPrice: 0, participants:[] }] })}>
              Reset
            </button>
          </section>
        </form>
      );
    }