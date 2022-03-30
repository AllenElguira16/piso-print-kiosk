import five from 'johnny-five';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Express } from 'express';

const Board = (() => {
  const board = new five.Board({
    port: 'COM5'
  });
  
  return {
    start (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, coinState: { getCoins(): number;setCoins(newValue: number): void;}) {
      board.on('ready', () => {
        const coinSlot = new five.Button(7);
        
        console.log(coinSlot);
        coinSlot.on('press', () => {
          console.log('coin inserted');

          coinState.setCoins(coinState.getCoins() + 1);
          io.emit('coins', { total: coinState.getCoins() });
        });
      });
    }
  }
})();
// const Board = (() => {
//   return {
//     start(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, coinState: { getCoins(): number;setCoins(newValue: number): void;}, app: Express) {
//       app.get('/', (req, res) => {
//         coinState.setCoins(coinState.getCoins() + 1);

//         io.emit('coins', { total: coinState.getCoins() });
//         res.send('Added');
//       });
//     }
//   }
// })();

export default Board;
