import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
export default function BillForm(props) {
    const { control, watch, setValue } = useForm({ defaultValues: { billItems: props.bill } });
    const { fields, append, remove } = useFieldArray({ control, name: "billItems" });
    const watchBillItems = useWatch({control, name: "billItems"});
    const controlledFields = fields.map((field, index) => {
        return {
          ...field,
          ...watchBillItems[index]
        };
      });
      useEffect(() => {
          props.setBill(watchBillItems);
      }, [watchBillItems]);   
     
    
      return (
        <form>         
          <ul>
            {controlledFields.map((item, billIndex) => (
                <li key={item.id}>
                  <Controller render={({ field }) => <input {...field} />} name={`billItems.${billIndex}.itemName`} control={control}/>
                  <Controller render={({ field }) => <input {...field} />} name={`billItems.${billIndex}.quantity`} control={control}/>
                  <Controller render={({ field }) => <input {...field} />} name={`billItems.${billIndex}.unitPrice`} control={control}/>
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
            <button type="button" onClick={() => setValue("billItems", [] )}>Reset</button>
          </section>
        </form>
      );
    }