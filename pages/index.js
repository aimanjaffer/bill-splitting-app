import Head from 'next/head'
import Participants from '../components/participants'
import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import BillForm from '../components/billForm';
const initialParticipants = [
    { id: "0", name: "Aiman" },
    { id: "1", name: "Pee" },
    { id: "2", name: "Vaishak" },
    { id: "3", name: "Zakki" },
    { id: "4", name: "Ullas" },
    { id: "5", name: "Vivek" },
    { id: "6",  name: "Sunad"},
    { id: "7",  name: "Rahul" },
    { id: "8",  name: "Vishal" },
    { id: "9",  name: "Chandy" },
    { id: "10", name: "BD" },
    { id: "11", name: "Pranav" }
];
const initialBill = [
  {itemId: 0, itemName: "Biryani", unitPrice:250, quantity:2, participants:[{ id: "6",  name: "Sunad"},{  id: "7",  name: "Rahul" }]},
  {itemId: 1, itemName: "Pizza", unitPrice:200, quantity:1, participants:[{ id: "8",  name: "Vishal"},{ id: "9",  name: "Chandy"}]},
  {itemId: 2, itemName: "Burger", unitPrice:50, quantity:3, participants:[{ id: "10", name: "BD"},{ id: "11", name: "Pranav"}]}
];
export default function Home() {
  const [windowReady, setWindowReady] = useState(false);
  const [participants, setParticipants] = useState(initialParticipants);
  const [bill, setBill] = useState(initialBill);
  useEffect(() => {
      setWindowReady(true);
  }, []);

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
* Moves an item from one list to another list.
*/
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  let removed = sourceClone[droppableSource.index];
  if(droppableSource.droppableId !== 'participants')
    [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};


const getList = (id) => {
  if(id === "participants")
    return participants;
  else{
    //console.log(bill[id].participants);
    return bill[id].participants;
  }
};

const handleOnDragEnd = result => {
  //console.log(result);
  const { source, destination } = result;

  // dropped outside the list
  if (!destination) {
      return;
  }

  if (source.droppableId === destination.droppableId) {
      const participantsLocal = reorder(
          getList(source.droppableId),
          source.index,
          destination.index
      );
      if(source.droppableId === 'participants'){
        setParticipants(participantsLocal);
      }
      else {
          setBill((prevValue) => {
            let currentValue = prevValue.map((item, index) => {
              if(index == source.droppableId)
                item.participants = participantsLocal;
              return item;
            });
            //console.log(currentValue);
            return currentValue;
          });
      }

      
  } else {
      const result = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination
      );
      if(result.participants){
        setParticipants(result.participants);
      }
      
      setBill((prevValue) => {
        let currentValue = prevValue.map((item, index) => {
          if(index == destination.droppableId)
            item.participants = result[destination.droppableId];
          if(index == source.droppableId)
            item.participants = result[source.droppableId];
          return item;
        });
        //console.log(currentValue);
        return currentValue;
      });      
  }
};

  return (
    <div>
      <Head>
        <title>Split-EZ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {windowReady && bill && <BillForm bill={bill}/>}
        {windowReady && participants && <Participants participants={participants}/>}
      </DragDropContext>
    </div>
  )
}
