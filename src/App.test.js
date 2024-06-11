// src/App.test.js
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders the new chat button', () => {
  render(<App />);
  const newChatButton = screen.getByText('+ New chat');
  expect(newChatButton).toBeInTheDocument();
});

test('creates a new chat when the button is clicked', () => {
  render(<App />);
  const newChatButton = screen.getByText('+ New chat');
  fireEvent.click(newChatButton);
  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('');
});

test('updates the input value when typing', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'Hello' } });
  expect(input).toHaveValue('Hello');
});

test('submits the message and updates the chat', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ choices: [{ message: { role: 'assistant', content: 'Hi there!' } }] })
    })
  );

  await act(async () => {
    render(<App />);
  });

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'Hello' } });
  
  const submitButton = screen.getByText('➢');
  fireEvent.click(submitButton);

  const assistantMessage = await screen.findByText('Hi there!');
  expect(assistantMessage).toBeInTheDocument();
});