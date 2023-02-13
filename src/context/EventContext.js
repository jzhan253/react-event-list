import React, {useEffect, useState, createContext} from 'react'
import { getEvents } from '../api/Api.js';

const EventContext = createContext();

export function EventProvider({ children }) { 
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(res => {
      setEvents(res.map(e => {
        return {...e, isEditing: false};
      }));
    });
    setTimeout(() => {
      console.log('Getting Events...');
      setIsLoading(false);
      console.log('Events Loaded!');
    }, 1000);
  }, []);


  return (
    <EventContext.Provider value={{
      isLoading,
      events,
      setEvents
    }}>
      {children}
    </EventContext.Provider>
  );
}

export default EventContext;
