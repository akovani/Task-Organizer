import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';
import renderer from "react-test-renderer";

test('renders the component without errors', () => {
    render(<Home />);
    expect(screen.getByText('Go to TaskOverview')).toBeInTheDocument();
});

test('renders the image of the component without errors', () => {
    render(<Home />);
    // Use getByRole to query for an image element
    const imageElement = screen.getByRole('img');
    // Expect that the image element is present in the document
    expect(imageElement).toBeInTheDocument();
});

test('snapshot matches implementation', () => {
    const tree = renderer.create(<Home/>).toJSON();
    expect(tree).toMatchSnapshot();
});
