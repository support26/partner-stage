//read data form firebase database
import { db } from './firebase';
import { ref, onValue, set } from "firebase/database";

const read = () => {
    const dbRef = ref(db);
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        console.log("data from db according ticket id",data.Tickets["33"]["Chat"]);
    });
    }

const write = () => {
    //timestamp in milisecond
    const timestamp = new Date().getTime();
    const ticketId = 33;
    const data = {
        "message": "hello for testing",
        "messageId": timestamp,
        "senderNumber": "supoport24@anaxee.com",
        "timestamp": timestamp
    }
        console.log("sending message from web app", data)
    const dbRef = ref(db, 'Tickets/' + ticketId + '/Chat/' + timestamp);
    set(dbRef, data);
}

read();
write();

