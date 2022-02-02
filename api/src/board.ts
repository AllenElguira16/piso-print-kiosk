import five from 'johnny-five';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';


const Board = (() => {
  const board = new five.Board({
    port: 'COM3'
  });
  
  let totalCoins = 0;
  let isCoinInserted = false;
  
  return {
    start (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
      board.on('ready', () => {
        const coinSlot = new five.Button(7);
      
        coinSlot.on('press', () => {
          if (!isCoinInserted) {
            isCoinInserted = true;
            totalCoins++;
          }
        });
      
        coinSlot.on('release', () => {
          if (isCoinInserted) {
            io.emit('coins', { total: totalCoins });
            isCoinInserted = false;
          }
        })
      
      });
    }
  }
})();

export default Board;
