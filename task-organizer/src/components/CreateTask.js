import React, { useState } from "react";
import "./CreateTask.css";
import WriteTask from "../database/writeTask";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import logger from "./logger";

function CreateTask() {
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const priorityOptions = ["High", "Medium", "Low"];
    const statusOptions = ["To do", "In progress", "Done"];
    const [submissionStatus, setSubmissionStatus] = useState(null);

    // function to handle the selected status
    const handleStatusSelect = (option) => {
        setStatus(option);
    };

    // function to handle the selected priority
    const handlePrioritySelect = (option) => {
        setPriority(option)
    }

    // function to submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            let docId = WriteTask(name, description, status, priority);
            setSubmissionStatus("success");
            setDescription("");
            setName("");
            setPriority("");
            setStatus("");
            logger.info(`Task created with the following properties: ${docId}, ${description}, ${priority}, ${name}, ${status}`);
        } catch (error) {
            logger.error(`Error creating task: ${error}`);
            setSubmissionStatus("error");
        }
    };


    return (
        <div className="create-task">
            <div className="container">
                <h1>Create a task</h1>
                <br />
                <div className="form">
                    <Form onSubmit={handleSubmit}>
                        <Table bordered={false} striped={false}>
                            <tbody>
                                <tr>
                                    <td>
                                        <Form.Group>
                                            <Form.Label htmlFor="name">Name:</Form.Label>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Form.Group>
                                            <Form.Label htmlFor="description">Description:</Form.Label>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Control
                                            id="description"
                                            name="description"
                                            type="text"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Form.Group>
                                            <Form.Label htmlFor="priority">Priority:</Form.Label>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Select
                                            id="priority"
                                            name="priority"
                                            value={priority}
                                            onChange={(e) => handlePrioritySelect(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select an option
                                            </option>
                                            {priorityOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Form.Group>
                                            <Form.Label htmlFor="status">Status:</Form.Label>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Select
                                            id="status"
                                            name="status"
                                            value={status}
                                            onChange={(e) => handleStatusSelect(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select an option
                                            </option>
                                            {statusOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button className="ButtonMargin" variant="primary" type="submit" style={{ marginBottom: "2em" }}>
                            Submit
                        </Button>
                        {submissionStatus === "success" && (
                            <Card className="CardStyle">
                                <Card.Body>
                                    <Card.Title className="text-success">Success</Card.Title>
                                    <Card.Text>
                                        Task successfully created!
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )}
                        {submissionStatus === "error" && (
                            <Card className="CardStyle">
                                <Card.Body>
                                    <Card.Title className="text-danger">Error</Card.Title>
                                    <Card.Text>
                                        Error while creating task. Please try again!
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )}
                    </Form>
                </div>
            </div>
        </div>

    );
}

export default CreateTask;
