import { getFirestore, doc, updateDoc } from "firebase/firestore";
import config from "./firebase-config";
import { initializeApp } from "firebase/app";
import getConfig from "../configuration/config-helper";

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

// function to update a task in firestore using its UUID
async function UpdateTaskByID(taskID, name, description, status, priority) {
    const taskRef = doc(db, getConfig().collection, taskID);

    try {
        await updateDoc(taskRef, {
            name: name,
            description: description,
            status: status,
            priority: priority,
        });
        console.log("Task updated successfully!");
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

export { UpdateTaskByID };
