import Head from 'next/head'
import Bill from '../components/bill'
import Participants from '../components/participants'
import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
const initialParticipants = [
    {
        id: "0",
        name: "Aiman"
    },{
        id: "1",
        name: "Pee"
    },{
        id: "2",
        name: "Vaishak"
    },{
        id: "3",
        name: "Zakki"
    },{
        id: "4",
        name: "Ullas"
    },{
        id: "5",
        name: "Vivek"
    }
];
const initialBillParticipants = [
  {
      id: "6",
      name: "Sunad"
  },{
      id: "7",
      name: "Rahul"
  },{
      id: "8",
      name: "Vishal"
  },{
      id: "9",
      name: "Chandy"
  },{
      id: "10",
      name: "BD"
  },{
      id: "11",
      name: "Pranav"
  }
];
export default function Home() {
  const [windowReady, setWindowReady] = useState(false);
  const [participants, setParticipants] = useState(initialParticipants);
  const [billParticipants, setBillParticipants] = useState(initialBillParticipants);
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
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
let id2List = {
  droppable: participants,
  droppable2: billParticipants
};

const getList = id => id2List[id];

const handleOnDragEnd = result => {
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
      if(source.droppableId === 'droppable'){
        setParticipants(participantsLocal);
      }
      if (source.droppableId === 'droppable2') {
          setBillParticipants(participantsLocal);
      }

      
  } else {
      const result = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination
      );

      setParticipants(result.droppable);
      setBillParticipants(result.droppable2);
  }
};

  return (
    <div>
      <Head>
        <title>Bill Splitting App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {windowReady && billParticipants && <Bill billParticipants={billParticipants}/>}
        {windowReady && participants && <Participants participants={participants}/>}
      </DragDropContext>
    </div>
  )
}
