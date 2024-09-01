import { Socket } from 'socket.io';
import { Server } from 'socket.io'; // Assurez-vous que cette importation correspond à votre configuration
import { Player } from 'src/model/player';
import { Map } from 'src/manager/map.manager';
import { Game } from 'src/manager/game.manager'; // Remplacez par le chemin correct vers votre module

const mockEmit = jest.fn();
const mockJoin = jest.fn();
const mockTo = jest.fn(() => ({ emit: mockEmit })) ;
const mockSocket = { id: 'test-client-id', emit: mockEmit, join: mockJoin, to: mockTo } as unknown as Socket;
const mockServer = { id: 'test-client-id', emit: mockEmit, join: mockJoin, to: mockTo } as unknown as Server;
describe('sendSpectre', () => {
  let players: Player[];
  let game: Game;
  beforeEach(() => {
    // Création des mocks pour les sockets

    // Création des joueurs et des cartes
    players = [
        new Player('player1', mockSocket, 'room1', 1, false, new Map(), 0),
        new Player('player2', mockSocket, 'room1', 1, false, new Map(), 0),
    ];
    game = new Game(players, "room", mockServer);

    // Injecter les joueurs dans le contexte de la fonction (si nécessaire)
    // Par exemple, si `sendSpectre` est une méthode d'une classe, vous devrez initialiser cette classe
  });

  it('should send spectre data to the client', () => {
    // Préparer la carte pour chaque joueur

    // Appeler la fonction à tester
    game.sendSpectre(mockSocket);

    // Vérifier que les données sont envoyées correctement
    // expect(mockServer.to('test-client-id').emit).toHaveBeenCalledWith('spectre');
  });
});
