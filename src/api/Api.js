const database = [
  {
    "title" : "Music Festival",
    "start" : "2023-01-20",
    "end" : "2023-01-20",
    "id" : 1
  },
  {
    "title" : "New York Trip",
    "start" : "2023-01-20",
    "end" : "2023-01-20",
    "id" : 2
  },
  {
    "title" : "Wakanda Forever",
    "start" : "2023-01-20",
    "end" : "2023-01-20",
    "id" : 3
  }
]

export async function getEvents() {
  return database;
}

export async function editEventById(eventId, newEvent) {
  database.forEach(event => {
    if(event.id === eventId) {
      event.title = newEvent.title;
      event.start = newEvent.start;
      event.end = newEvent.end;
    }
  });
  console.log('After editing, database = ', database);
  return {...newEvent, "id" : eventId};
}

export async function addEvent(newEvent) {
  database.push(newEvent);
  console.log('After adding, database = ', database);
  return newEvent;
}

export async function deleteEventById(eventId) { 
  const removedEvent = database.filter((event, index, arr) => {
    if(event.id === eventId) { 
      arr.splice(index, 1);
      return true;
    }
    return false;
  });
  console.log('After deleting, database = ', database);
  return removedEvent;
}