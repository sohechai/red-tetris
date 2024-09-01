import { Player } from 'src/model/player';

export const createMockPlayer = (pseudo: string, id: string, room: string, owner: boolean) => {
  return {
    user: {
      pseudo,
      client: { id },
      room,
      owner,
      score: 0,
      gameMode: 1
    },
    me: jest.fn().mockReturnValue({ pseudo, score: 0, owner })
  } as unknown as Player;
};