import { doc, getFirestore, setDoc } from "firebase/firestore";
import config from "./firebase-config";
import { initializeApp } from "firebase/app";
import getConfig from "../configuration/config-helper";
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// function that writes a task into the firestore and returns its UUID
function WriteTask(name, description, status, priority) {
    const id = uuidv4(); // Generate a new UUID

    setDoc(doc(db, getConfig().collection, id), {
        id: id,
        name: name,
        description: description,
        status: status,
        priority: priority,
    });

    return id;
}

export default WriteTask;
