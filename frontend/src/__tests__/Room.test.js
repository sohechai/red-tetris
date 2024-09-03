// import React from 'react';
// import { render, screen, fireEvent, cleanup } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Room from '../components/Room';
// import { useDispatch, useSelector } from 'react-redux';
// import { joinRoom, setupMeInfo, setupUserListeners } from '../socketActions';
// import { MemoryRouter } from 'react-router-dom';

// // Mock des imports
// jest.mock('react-redux', () => ({
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
// }));

// jest.mock('../socketActions', () => ({
//   joinRoom: jest.fn().mockReturnValue(() => Promise.resolve()),
//   setupMeInfo: jest.fn(),
//   setupUserListeners: jest.fn(),
// }));

// // Nettoyage après chaque test
// afterEach(() => {
//   cleanup();
//   jest.clearAllMocks();
// });

// describe('Composant Room', () => {
//   test('affiche le composant correctement', () => {
//     // Mock de useSelector pour renvoyer les utilisateurs
//     useSelector.mockReturnValue([]);

//     // Créer une fonction de mock pour dispatch
//     const dispatch = jest.fn();
//     useDispatch.mockReturnValue(dispatch);

//     // Render du composant avec MemoryRouter
//     render(
//       <MemoryRouter>
//         <Room />
//       </MemoryRouter>
//     );

//     // Vérifier la présence des éléments
//     expect(screen.getByTestId('room-container')).toBeInTheDocument();
//     expect(screen.getByTestId('play-logo')).toBeInTheDocument();
//     expect(screen.getByTestId('room-form')).toBeInTheDocument();
//     expect(screen.getByTestId('room-name-input')).toBeInTheDocument();
//     expect(screen.getByTestId('username-input')).toBeInTheDocument();
//     expect(screen.getByTestId('submit-button')).toBeInTheDocument();
//     expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
//   });

//   test('affiche un message d\'erreur si les champs sont vides', () => {
//     // Mock de useSelector pour renvoyer les utilisateurs
//     useSelector.mockReturnValue([]);

//     // Créer une fonction de mock pour dispatch
//     const dispatch = jest.fn();
//     useDispatch.mockReturnValue(dispatch);

//     // Render du composant avec MemoryRouter
//     render(
//       <MemoryRouter>
//         <Room />
//       </MemoryRouter>
//     );

//     // Trouver les éléments du formulaire
//     const submitButton = screen.getByTestId('submit-button');

//     // Laisser les champs vides et soumettre le formulaire
//     fireEvent.click(submitButton);

//     // Vérifier le message d'erreur
//     expect(screen.getByTestId('error-message')).toHaveTextContent('Both fields are required');
//   });

//   test('appelle joinRoom et navigue vers la salle lorsque les champs sont remplis', async () => {
//     // Mock de useSelector pour renvoyer les utilisateurs
//     useSelector.mockReturnValue([]);

//     // Créer une fonction de mock pour dispatch
//     const dispatch = jest.fn();
//     useDispatch.mockReturnValue(dispatch);

//     // Mock de useNavigate
//     const navigate = jest.fn();
//     jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

//     // Render du composant avec MemoryRouter
//     render(
//       <MemoryRouter>
//         <Room />
//       </MemoryRouter>
//     );

//     // Trouver les éléments du formulaire
//     const roomNameInput = screen.getByTestId('room-name-input');
//     const usernameInput = screen.getByTestId('username-input');
//     const submitButton = screen.getByTestId('submit-button');

//     // Remplir les champs
//     fireEvent.change(roomNameInput, { target: { value: 'test-room' } });
//     fireEvent.change(usernameInput, { target: { value: 'test-user' } });

//     // Soumettre le formulaire
//     fireEvent.click(submitButton);

//     // Vérifier que joinRoom a été appelé avec les bons arguments
//     expect(joinRoom).toHaveBeenCalledWith('test-room', 'test-user');
    
//     // Vérifier que la navigation a été appelée avec la bonne URL
//     expect(navigate).toHaveBeenCalledWith('/test-room/test-user');
//   });

//   test('appelle les actions setupUserListeners et setupMeInfo lors du premier rendu', () => {
//     // Mock de useSelector pour renvoyer les utilisateurs
//     useSelector.mockReturnValue([]);

//     // Créer une fonction de mock pour dispatch
//     const dispatch = jest.fn();
//     useDispatch.mockReturnValue(dispatch);

//     // Render du composant avec MemoryRouter
//     render(
//       <MemoryRouter>
//         <Room />
//       </MemoryRouter>
//     );

//     // Vérifier que setupUserListeners et setupMeInfo sont appelés
//     expect(setupUserListeners).toHaveBeenCalled();
//     expect(setupMeInfo).toHaveBeenCalled();
//   });
// });
