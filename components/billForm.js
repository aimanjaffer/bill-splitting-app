import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
export default function BillForm(props) {
    const { control, setValue } = useForm({ defaultValues: { billItems: props.bill } });
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
        <div className="bg-gray-700 rounded-lg">
        <form>         
          <ul>
            {controlledFields.map((item, billIndex) => (
                <li key={item.id}>
                  <Controller render={({ field }) => <input placeholder="Item Name" autocomplete="off" className="p-2 rounded-lg shadow-md hover:shadow-xl mt-2 ml-2" {...field} />} name={`billItems.${billIndex}.itemName`} control={control}/>
                  <Controller render={({ field }) => <input placeholder="Quantity" autocomplete="off" className="p-2 rounded-lg shadow-md hover:shadow-xl ml-2 mt-2" {...field} />} name={`billItems.${billIndex}.quantity`} control={control}/>
                  <Controller render={({ field }) => <input placeholder="Unit Price" autocomplete="off" className="p-2 rounded-lg shadow-md hover:shadow-xl ml-2 mt-2" {...field} />} name={`billItems.${billIndex}.unitPrice`} control={control}/>
                  <button className="bg-red-500 p-2 rounded-lg hover:bg-red-600 hover:shadow-xl ml-2 mt-2 mb-2 text-white" type="button" onClick={() => remove(billIndex)}>Delete</button>
                  <Droppable droppableId={""+billIndex}>
                    {(provided, snapshot) => (
                        <div className="ml-2" ref={provided.innerRef}>
                            {props?.bill[billIndex]?.participants?.map((item, index) => (
                                <Draggable
                                    key={item.name}
                                    draggableId={item.name+"_"+billIndex+"_"+index}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <p className="text-xl text-white font-semibold hover:bg-gray-600 rounded-lg p-2" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            {item.name}
                                        </p>
                                    )}
                                </Draggable>
                            ))}
                            <p>{provided.placeholder}</p>
                        </div>
                    )}
                </Droppable>
                </li>
              )
            )}
          </ul>
          <section>
            <button className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600 hover:shadow-xl mt-2 ml-2 mb-2 text-white" type="button" onClick={() => append({ itemName: "", quantity: "", unitPrice: "", participants:[] })}>
              Add Row
            </button>
            <button className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600 hover:shadow-xl mt-2 ml-2 mb-2 text-white" type="button" onClick={() => setValue("billItems", [] )}>Reset Bill</button>
          </section>
        </form>
        </div>
      );
    }