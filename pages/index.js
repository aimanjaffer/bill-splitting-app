import Head from 'next/head'
import Participants from '../components/participants'
import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import BillForm from '../components/billForm';
const initialParticipants = [
    {id: "0", name: "Aiman"},
    {id: "1", name: "Pee"},
    {id: "2", name: "Vaishak"},
    {id: "3", name: "Zakki"},
    {id: "4", name: "Ullas"},
    {id: "5", name: "Vivek"},
    {id: "6",  name: "Sunad"},
    {id: "7",  name: "Rahul"},
    {id: "8",  name: "Vishal"},
    {id: "9",  name: "Chandy"},
    {id: "10", name: "BD"},
    {id: "11", name: "Pranav"}
];

export default function Home() {
  const [windowReady, setWindowReady] = useState(false);
  const [participants, setParticipants] = useState(initialParticipants);
  const [bill, setBill] = useState([]);
  const [total, setTotal] = useState(0);
  const [contributions, setContributions] = useState({});
  useEffect(() => {
      setWindowReady(true);
  }, []);
  useEffect(() => {
    //console.log("bill changed ", bill);
    let sum = bill.map((item) => item.quantity * item.unitPrice).reduce((prev, current) => prev + current, 0);
    setTotal(sum);
    let individualShareOfBillItems = bill.map((item) => (item.quantity * item.unitPrice) / (item?.participants?.length || 1));
    let localContributions = new Map();
    for(let index in bill){
      let participantNames = bill[index]?.participants?.map(participant => participant.name);
      for(let name of participantNames){
        if(localContributions.has(name)){
          localContributions.set(name, localContributions.get(name) + individualShareOfBillItems[index]);
        }else{
          localContributions.set(name, individualShareOfBillItems[index]);
        }
      }
    }
    let obj = Array.from(localContributions).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
    setContributions(obj);
  },[bill]);

  const changeBill = (value) => {
    setBill(value);
  };
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Moves an item from one list to another list.
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
        {windowReady && bill && <BillForm bill={bill} setBill={changeBill}/>}
        {windowReady && participants && <Participants participants={participants}/>}
      </DragDropContext>
      {contributions && <p>{JSON.stringify(contributions)}</p>}
      {total && <p>{total}</p>}
    </div>
  )
}
