// src/cats/cats.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { Player } from '../player';
import { Socket } from 'socket.io';
import { Map } from 'src/manager/map.manager';
import { Bag } from 'src/manager/bag.manager';

describe('MathOperations', () => {
    let player: Player;
    let player2: Player;
    let players: Player[];
    let map: Map;
    let map1: Map;
    let bag: Bag;
    beforeEach(() => {
        map = new Map;
        map1 = new Map;
        map.map[0][1] = 17;
        let socket: Socket = { id: 'socket1' } as Socket;
        let socket1: Socket = { id: 'socket2' } as Socket;
        player = new Player("joueur1", socket, "room", 1, true, map, 0);
        player2 = new Player("joueur2", socket1, "room", 1, true, map1, 0);
        players = [player, player2];
    });

    it('should be defined', () => {
        expect(player).toBeDefined();
    });

    it('should return the actual user', () => {
        const result = player.me();
        expect(result.pseudo).toBe("joueur1");
        expect(result.room).toBe("room");
        expect(result.owner).toBe(true);
        expect(result.score).toBe(0);
    });

    it('should tell that player has lost', () => {
        const result = player.hasLost();
        expect(result).toBe(true);
    });

    it('should tell that player has not lost', () => {
        const result = player2.hasLost();
        expect(result).toBe(false);
    });

    it('should return the room name', () => {
        let socket: Socket = { id: 'socket1' } as Socket;
        const result = Player.getRoomBySocketId(players, socket);
        expect(result).toBe("room");
    });

    it('should init the bag', () => {
        bag = new Bag();
        player.initBag(bag.blocks);
        const result = player.bag.length;
        expect(result).toBe(bag.blocks.length);
    });

    it('should return the next piece', () => {
        const type = ["X", "I", "J", "L", "O", "S", "T", "Z"];
        let piece = 0;
        bag = new Bag();
        player.initBag(bag.blocks);
        for(let i = 0; i < player.bag[0].block[player.bag[0].rotation][0].length; i++) {
            if (player.bag[0].block[player.bag[0].rotation][0][i] < 8 && player.bag[0].block[player.bag[0].rotation][0][i] > 0)
                piece = player.bag[0].block[player.bag[0].rotation][0][i];
        };
        if (piece === 0)
            piece = 1;
        const result = player.getNextPiece();
        expect(result).toBe(type[piece]);
    });
});