import React, {useState, useContext} from 'react';
import {addEvent, editEventById, deleteEventById} from '../../api/Api.js';
import EventContext from '../../context/EventContext';

export default function EventRow(props) {
  const {id, title, start, end, isEditing} = props.event;
  const [eventTitle, setEventTitle] = useState(title);
  const [eventStart, setEventStart] = useState(start);
  const [eventEnd, setEventEnd] = useState(end);
  const { events, setEvents } = useContext(EventContext);

  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
  }

  const handleStartChange = (e) => {
    setEventStart(e.target.value);
  }

  const handleEndChange = (e) => {
    setEventEnd(e.target.value);
  }

  const handleAdd = () => {
    const newEvent = {
      title: eventTitle,
      start: eventStart,
      end: eventEnd,
      id: id
    }
    if(inputIsValid()) {
      if(isEditing === 'Add') {
        addEvent(newEvent).then(res => console.log('New event added to database: ', res));
      } else {
        editEventById(id, {
          title: eventTitle,
          start: eventStart,
          end: eventEnd
        }).then(res => console.log('Event edited: ', res));
      }
      
      setEvents(events.map(e => {
        if(e.id === id) {
          return {
            ...newEvent,
            isEditing: false
          };
        } else {
          return e;
        }
      }));
    } else {
      alert('Invalid event');
      console.log('Invalid input')
    }
  };

  const handleEdit = () => {
    setEvents(events.map(e => {
      if(e.id === id) {
        return {
          ...e,
          isEditing: 'Edit'
        };
      } else {
        return e;
      }
    }));
  };

  const handleDelete = () => {
    deleteEventById(id).then(res => console.log('Deleted event', res));
    setEvents(events.filter(e => e.id !== id));
  };

  const inputIsValid = () => {
    return eventTitle !== undefined && eventTitle !== '' &&  eventStart !== undefined && eventEnd !== undefined && eventStart !== '' && eventEnd !== '' &&  (Date.parse(eventStart) <= Date.parse(eventEnd));
  }

  return (
    <>
      <tr className="event-row" key={id}>
        <td>
          {isEditing ? <input className="event-title" type="text" value={eventTitle} onChange={handleTitleChange}/> :
          <input className="event-title" type="text" value={eventTitle} readOnly/>}
          
        </td>
        <td>
        {isEditing ? <input className="event-start-date" type="date" value={eventStart}  onChange={handleStartChange}/> :
          <input className="event-start-date" type="date" value={eventStart} readOnly/>}
        </td>
        <td>
        {isEditing ? <input className="event-end-date" type="date" value={eventEnd}  onChange={handleEndChange}/> :
          <input className="event-end-date" type="date" value={eventEnd} readOnly/>}
        </td>
        <td>
          <div className="event-actions">
            {isEditing ? <button className="event-button-1" onClick={handleAdd}>{isEditing === 'Add' ? 'Add' : 'Save'}</button> : <button className="event-button-1" onClick={handleEdit}>Edit</button>}
            <button className="delete-btn" onClick={handleDelete}>{isEditing === 'Add' ? 'Cancel' : 'Delete'}</button>
          </div>
        </td>
      </tr>
    </>
  )
}
