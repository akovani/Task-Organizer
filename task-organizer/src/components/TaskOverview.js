import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query } from "firebase/firestore";
import "./TaskOverview.css";
import { Pencil, Trash } from 'react-bootstrap-icons';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import config from "../database/firebase-config";
import { DeleteTaskByID } from "../database/deleteTask";
import { UpdateTaskByID } from "../database/updateTask";
import getConfig from "../configuration/config-helper";
import Form from "react-bootstrap/Form"
import logger from "./logger";

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

const TaskOverview = () => {
    const [tasks, setTasks] = useState([]);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [editableTask, setEditableTask] = useState(null);
    const statusOptions = ["To do", "In progress", "Done"];
    const priorityOptions = ["High", "Medium", "Low"];

    // fetch tasks from Firestore and subscribe to real-time updates
    useEffect(() => {
        const fetchData = async () => {
            try {
                const collection_name = getConfig().collection;
                const tasksQuery = query(collection(db, collection_name));

                // Subscribe to real-time updates using onSnapshot
                const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
                    const updatedTasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    const sortedTasks = sortTasks(updatedTasks, sortColumn, sortOrder);
                    setTasks(sortedTasks);
                });

                // unsubscribe when component is unmounted or dependencies change
                return () => {
                    unsubscribe();
                };
            } catch (error) {
                logger.error(`Error fetching tasks: ${error}`);
            }
        };

        fetchData();
    }, [sortColumn, sortOrder]);

    // function to sort tasks based on column (abc or levels)
    const sortTasks = (tasks, column, order) => {
        return tasks.slice().sort((a, b) => {
            if (column === "status") {
                const statusOrder = { "To do": 1, "In progress": 2, "Done": 3 };
                return order === "asc" ? statusOrder[a[column]] - statusOrder[b[column]] : statusOrder[b[column]] - statusOrder[a[column]];
            } else if (column === "priority") {
                const priorityOrder = { "Low": 1, "Medium": 2, "High": 3 };
                return order === "asc" ? priorityOrder[a[column]] - priorityOrder[b[column]] : priorityOrder[b[column]] - priorityOrder[a[column]];
            } else {
                return order === "asc" ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
            }
        });
    };

    // function that handles sorting
    const handleSort = (column) => {
        const newOrder = column === sortColumn && sortOrder === "asc" ? "desc" : "asc";
        setSortColumn(column);
        setSortOrder(newOrder);
    };

    // function that returns sorting symbol
    const getSortIndicator = (column) => {
        if (column === sortColumn) {
            return sortOrder === "asc" ? "▲" : "▼";
        }
        return null;
    };

    // function that handles edit
    const handleEdit = (task) => {
        setEditableTask(task);
    };

    // function to apply edits to the task
    const handleApply = () => {
        if (editableTask) {
            try {
                UpdateTaskByID(editableTask.id, editableTask.name, editableTask.description, editableTask.status, editableTask.priority);
                logger.info(`Successfully updated the following Task: ${editableTask.id}`);
            }
            catch (error) {
                logger.error(`Error updating task: ${error}`);
            }
            setEditableTask(null);
        }
    };

    // function that handles cancel
    const handleCancel = () => {
        setEditableTask(null);
    };

    return (
        <div className="task-overview">
            <div className="container">
                <h1>Task Overview</h1>
                <a href="/CreateTask" className="btn btn-primary">Create a Task</a>
                <table className="table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("name")}>
                                Name {getSortIndicator("name")}
                            </th>
                            <th onClick={() => handleSort("description")}>
                                Description {getSortIndicator("description")}
                            </th>
                            <th onClick={() => handleSort("status")}>
                                Status {getSortIndicator("status")}
                            </th>
                            <th onClick={() => handleSort("priority")}>
                                Priority {getSortIndicator("priority")}
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>
                                    {editableTask && editableTask.id === task.id ? (
                                        <input
                                            type="text"
                                            value={editableTask.name}
                                            onChange={(e) => setEditableTask({ ...editableTask, name: e.target.value })}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={task.name}
                                            disabled={true}
                                        />
                                    )}
                                </td>
                                <td>
                                    {editableTask && editableTask.id === task.id ? (
                                        <textarea
                                            className="e-input"
                                            value={editableTask.description}
                                            rows={4}
                                            data-testid={`description-input-${task.id}`}
                                            onChange={(e) => setEditableTask({ ...editableTask, description: e.target.value })}
                                        />
                                    ) : (
                                        <textarea
                                            className="e-input"
                                            value={task.description}
                                            readOnly={true}
                                            disabled={true}
                                            rows={4}
                                            style={{ resize: "none" }}
                                        />
                                    )}
                                </td>
                                <td>
                                    {editableTask && editableTask.id === task.id ? (
                                        <Form.Select
                                            value={editableTask.status}
                                            onChange={(e) => setEditableTask({ ...editableTask, status: e.target.value })}
                                        >
                                            {statusOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={task.status}
                                            disabled={true}
                                        />

                                    )}
                                </td>
                                <td>
                                    {editableTask && editableTask.id === task.id ? (
                                        <Form.Select
                                            value={editableTask.priority}
                                            onChange={(e) => setEditableTask({ ...editableTask, priority: e.target.value })}
                                        >
                                            {priorityOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={task.priority}
                                            disabled={true}
                                        />
                                    )}
                                </td>
                                <td>
                                    {editableTask && editableTask.id === task.id ? (
                                        <>
                                            <button type="button" className="btn btn-success apply-button" onClick={handleApply}>
                                                Apply
                                            </button>
                                            <button type="button" className="btn btn-danger cancel-button" onClick={handleCancel}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="button-container">
                                                <button type="button" className="btn btn-warning small-button" data-testid={`edit-button-${task.id}`} onClick={() => handleEdit(task)}>
                                                    <Pencil className="icon" />
                                                </button>
                                                <button type="button" className="btn btn-danger small-button" data-testid={`delete-button-${task.id}`} onClick={() => DeleteTaskByID(task.id)}>
                                                    <Trash className="icon" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskOverview;
