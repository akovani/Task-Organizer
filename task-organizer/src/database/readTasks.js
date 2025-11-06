import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
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

// function that returns array of all tasks
async function ReadAllTasks() {
    const tasksCollectionRef = collection(db, getConfig().collection);
    const tasksSnapshot = await getDocs(tasksCollectionRef);

    const tasks = [];
    tasksSnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
    });
    console.log(tasks);
    return tasks;
}

// function that returns single task by its UUID
async function ReadTaskByID(taskId) {
    const taskDocRef = doc(db, getConfig().collection, taskId);
    const taskDocSnapshot = await getDoc(taskDocRef);

    if (taskDocSnapshot.exists()) {
        const taskData = { id: taskDocSnapshot.id, ...taskDocSnapshot.data() };
        console.log(taskData);
        return taskData;
    } else {
        console.log("Task not found");
        return null;
    }
}

export { ReadAllTasks, ReadTaskByID };
