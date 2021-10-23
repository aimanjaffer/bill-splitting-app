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
          <p className="p-4 text-2xl text-white">Split a New Bill:</p>
        <form>         
          <ul>
            {controlledFields.map((item, billIndex) => (
                <li className="bg-gray-800 rounded-lg m-2" key={item.id}>
                  <Controller render={({ field }) => <input placeholder="Item Name" autoComplete="off" className="p-2 rounded-lg shadow-md hover:shadow-xl mt-2 ml-2" {...field} />} name={`billItems.${billIndex}.itemName`} control={control}/>
                  <Controller render={({ field }) => <input type="number" placeholder="Quantity" autoComplete="off" className="p-2 rounded-lg shadow-md hover:shadow-xl ml-2 mt-2" {...field} />} name={`billItems.${billIndex}.quantity`} control={control}/>
                  <Controller render={({ field }) => <input type="number" placeholder="Unit Price" autoComplete="off" className="p-2 rounded-lg shadow-md hover:shadow-xl ml-2 mt-2" {...field} />} name={`billItems.${billIndex}.unitPrice`} control={control}/>
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