import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import config from "./firebase-config";
import { initializeApp } from "firebase/app";
import getConfig from "../configuration/config-helper";
import logger from "../components/logger";

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

// function that deletes entry from firestore based on its UUID
async function DeleteTaskByID(taskID) {
    try {
        const taskDocRef = doc(db, getConfig().collection, taskID);
        await deleteDoc(taskDocRef);
        logger.info(`Task with ID ${taskID} deleted successfully.`);
    } catch (error) {
        logger.error(`Error deleting task: ${error}`);
    }
}

export { DeleteTaskByID };
