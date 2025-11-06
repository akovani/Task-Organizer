import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateTask from '../components/CreateTask';
import renderer from "react-test-renderer";

describe('CreateTask Component', () => {
  test('renders CreateTask component', () => {
    render(<CreateTask />);

    // Check if the heading is rendered
    expect(screen.getByText('Create a task')).toBeInTheDocument();

    // Check if form elements are rendered
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority:')).toBeInTheDocument();
    expect(screen.getByLabelText('Status:')).toBeInTheDocument();

    // Check if the submit button is rendered
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('handles form submission', () => {
    render(<CreateTask />);

    // Mocking the WriteTask function
    const originalWriteTask = require('../database/writeTask').default;
    const mockWriteTask = jest.fn();
    require('../database/writeTask').default = mockWriteTask;

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Task Name' } });
    fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Task Description' } });
    fireEvent.change(screen.getByLabelText('Priority:'), { target: { value: 'High' } });
    fireEvent.change(screen.getByLabelText('Status:'), { target: { value: 'To do' } });

    // Submit the form
    fireEvent.click(screen.getByText('Submit'));

    // Check if WriteTask is called with the correct arguments
    expect(mockWriteTask).toHaveBeenCalledWith('Task Name', 'Task Description', 'To do', 'High');

    // Restore the original WriteTask function
    require('../database/writeTask').default = originalWriteTask;
  });
  test('snapshot matches implementation', () => {
    const tree = renderer.create(<CreateTask />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
