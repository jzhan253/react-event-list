import React, { useContext } from 'react';
import { getEvents } from '../../api/Api.js';
import EventRow from '../EventRow/EventRow';
import EventHeader from '../EventHeader/EventHeader';
import EventContext from '../../context/EventContext';


export default function EventTable() {
  const { isLoading, events } = useContext(EventContext);
  console.log("Current Events", events);
  
  if(isLoading) return <p>loading ...</p>

  return (
    <div className="app__event-table">
      <table className="event-table">
        <thead className="table-header">
          <tr>
            <th colSpan="4"></th>
          </tr>
        </thead>
        <tbody className="table-body">
          <tr className="table-header-row">
            <EventHeader />
          </tr>
          {
            events.map(e => {return <EventRow key={e.id} event={e}/>})
          }
        </tbody>
      </table>
      
    </div>
  )
}
