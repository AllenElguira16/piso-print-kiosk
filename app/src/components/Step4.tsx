import React, { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

type TProps = {
  start: () => void;
  prevStep: () => void;
  socket: Socket;
  file: File;
  printInfo: {
    pages: number;
    coupon: string;
    copies: number;
  };
}


const Step4: FC<TProps> = ({ start, prevStep, file, printInfo, socket }) => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [printStatus, setPrintStatus] = useState<'ready'|'done'|null>(null);

  socket.on('coins', ({ total }: {total: number}) => {
    setTotalCoins(total);
  });

  const startPrinting = () => {
    setPrintStatus('ready');
    socket.emit('prepare-printing', { filepath: file.path, printInfo });

    socket.on('start-printing', () => {
      setPrintStatus('done');
    });
  }

  useEffect(() => {
    if (totalCoins >= printInfo.copies)
      setPrintStatus('ready');
  }, [totalCoins]);

  return (
    <>
      {/* {printStatus === 'ready' && ( */}
      <div className="flex h-screen">
        <div className="m-auto flex flex-col gap-4 w-5/12">
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 gap-4 justify-between">
              <div className="w-1/2 card">
                <header className="font-bold text-2xl">Amount to pay</header>
                <div>{printInfo.copies * printInfo.pages}.00 ₱</div>
              </div>
              <div className="w-1/2 card">
                <header className="font-bold text-2xl">Inserted amount</header>
                <div>{totalCoins}.00 ₱</div>
              </div>
            </div>
            <div className="card">
              <header className="font-bold text-2xl">Summary</header>
              <div className="flex flex-col justify-between h-20 my-24">
                <div>Document: {file.name}</div>
                <div>Pages: {printInfo.pages}</div>
                <div>Size: {printInfo.coupon}</div>
                <div>Copies: {printInfo.copies}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            {printStatus === 'ready' && (
              <button className="button-primary" onClick={startPrinting}>
                Start Printing
              </button>
            )}
            {printStatus === 'done' && (
              <h1>Printing Started you can add another file to print while waiting for printing</h1>
            )}
          </div>
        </div>
      </div>
      {printStatus !== 'done' && (
        <div className="absolute bottom-4 right-4 left-4">
          <div className="flex justify-between">
            <button className="button-secondary" onClick={prevStep}>
              Prev
            </button>
          </div>
        </div>
      )}
      {printStatus === 'done' && (
        <div className="absolute bottom-4 right-4 left-4">
          <div className="flex justify-between">
            <button className="button-primary" onClick={start}>
              Back to Start
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Step4;
