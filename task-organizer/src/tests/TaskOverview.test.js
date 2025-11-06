import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskOverview from '../components/TaskOverview';
import renderer from "react-test-renderer";

  test('renders without crashing', () => {
    render(<TaskOverview />);
    // Check if the component renders without crashing
    expect(screen.getByText('Task Overview')).toBeInTheDocument();
  });

  test('renders Create a Task button', () => {
    render(<TaskOverview />);
    // Check if the "Create a Task" button is present
    expect(screen.getByText('Create a Task')).toBeInTheDocument();
  });

  test('renders table headers', () => {
    render(<TaskOverview />);
    // Check if the table headers are present
    expect(screen.getByText('Name ▲')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Priority')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('snapshot matches implementation', () => {
    const tree = renderer.create(<TaskOverview/>).toJSON();
    expect(tree).toMatchSnapshot();
});

