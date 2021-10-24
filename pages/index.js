import Head from 'next/head'
import Participants from '../components/participants'
import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import BillForm from '../components/billForm';

export default function Home() {
  const [windowReady, setWindowReady] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [bill, setBill] = useState([]);
  const [total, setTotal] = useState(0);
  const [contributions, setContributions] = useState({});
  useEffect(() => {
      setWindowReady(true);
  }, []);
  useEffect( () => { 
    let body = document.querySelector("body");
    body.className= "bg-gradient-to-r from-blue-400 via-purple-400 to-red-400";
  } );
  useEffect(() => {
    //console.log("bill changed ", bill);
    let sum = bill.map((item) => item.quantity * item.unitPrice).reduce((prev, current) => prev + current, 0);
    setTotal(sum);
    let individualShareOfBillItems = bill.map((item) => Math.round((item.quantity * item.unitPrice) / (item?.participants?.length || 1)));
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
const addParticipant = (value) => {
  setParticipants((prevValue) => {return [...prevValue, value]});
}
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
  const { source, destination, draggableId } = result;

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
    let destinationList = getList(destination.droppableId);
    if(destinationList.filter(item => item.name === draggableId || draggableId.startsWith(item.name+"_")).length > 0)
      return;
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
      <div className="flex flex-row justify-center mt-4 mb-6">
        <div className="font-serif text-7xl">SplitsBill</div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="grid grid-cols-2 gap-1">
        {windowReady && bill && <BillForm bill={bill} setBill={changeBill}/>}
        {windowReady && participants && <Participants participants={participants} addParticipant={addParticipant} total={total} contributions={contributions}/>}
        </div>
      </DragDropContext>
    </div>
  )
}
