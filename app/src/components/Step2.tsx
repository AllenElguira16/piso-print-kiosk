import React, { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

type TProps = {
  socket: Socket;
  prevStep: () => void;
  nextStep: () => void;
}

const Step2: FC<TProps> = ({nextStep, socket}) => {
  const [isUsbConnected] = useState(false); 

  socket.on('usb-connected', function () {
    nextStep();
  });

  useEffect(() => {
    if (isUsbConnected) {
      nextStep();
    }
  }, [isUsbConnected, nextStep]);

  return (
    <div className="flex h-screen">
      <div className="m-auto w-2/3 text-center text-6xl">
        <div></div>
        <div>
          Please insert your flash drive
        </div>
      </div>
    </div>
  );
};

export default Step2;
