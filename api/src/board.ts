import five from 'johnny-five';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';


const Board = (() => {
  const board = new five.Board({
    port: 'COM4'
  });
  
  let totalCoins = 0;
  
  return {
    start (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
      board.on('ready', () => {
        const coinSlot = new five.Button(7);
      
        coinSlot.on('press', () => {
          console.log('coin inserted');

          totalCoins++;
          io.emit('coins', { total: totalCoins });
        });
      });
    }
  }
})();

export default Board;
