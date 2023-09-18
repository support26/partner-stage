import { db } from '../../firebase';
import { ref, onValue, set } from "firebase/database";

export const read = (callback) => {
  const dbRef = ref(db);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const write = (message, ticketId, adminEmail, userName) => {
//const timestamp = new Date().toLocaleString();
  const timestamp = new Date().getTime();
  const data = {
    message,
    messageId: timestamp.toString(),
    senderNumber: adminEmail,
    senderName: userName+'('+ adminEmail+')',
    timestamp: timestamp.toString()
  };
  const dbRef = ref(db, `Tickets/${ticketId}/Chat/${timestamp}`);
  set(dbRef, data);
};

