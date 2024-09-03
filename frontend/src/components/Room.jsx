import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Room from '../components/Room';  // Assurez-vous que le chemin est correct

// Mock des imports
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../socketActions', () => ({
  joinRoom: jest.fn().mockReturnValue(() => Promise.resolve()),
  setupMeInfo: jest.fn(),
  setupUserListeners: jest.fn(),
}));

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Composant Room', () => {
  test('appelle setupUserListeners et setupMeInfo lors du premier rendu', async () => {
    // Mock de useSelector pour renvoyer les utilisateurs
    useSelector.mockReturnValue([]);

    // Créer une fonction de mock pour dispatch
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    // Render du composant avec MemoryRouter
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Room />} />
        </Routes>
      </MemoryRouter>
    );

    // Vérifiez si setupUserListeners et setupMeInfo ont été appelés
    expect(dispatch).toHaveBeenCalledWith(setupUserListeners());
    expect(dispatch).toHaveBeenCalledWith(setupMeInfo());
  });
});
