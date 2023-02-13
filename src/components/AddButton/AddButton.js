import React, {useContext} from 'react'
import EventContext from '../../context/EventContext';
import uuid from 'react-uuid';
// import { getAvailableId } from '../../api/Api.js';

export default function AddButton() {

  const { setEvents } = useContext(EventContext);

  const handleClick = () => {
    setEvents(events => {
      return [
        ...events,
        {
          title: "",
          start: "",
          end: "",
          id: uuid(),
          isEditing: 'Add'
        }
      ]
    });
  }

  return (
    <div className="app__add-btn">
      <button className="add-btn" onClick={handleClick}>Add New Event</button>
    </div>
  )
}
