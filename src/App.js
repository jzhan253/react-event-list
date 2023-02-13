import React from 'react';
import EventTable from './components/EventTable/EventTable';
import AddButton from './components/AddButton/AddButton';
import { EventProvider } from './context/EventContext';
import './App.css'

export default function App() {
  
  return (
    <EventProvider>
      <div className="app">
        <AddButton />
        <EventTable />
      </div>
    </EventProvider>
  )
}
