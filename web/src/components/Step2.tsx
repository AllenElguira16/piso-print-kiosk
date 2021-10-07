import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image'; 
import msWord from '../styles/ms-word.png';

type TProps = {
  nextStep: () => void;
}

const Step2: FC<TProps> = ({nextStep}) => {
  const [isUsbConnected] = useState(true); 

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
