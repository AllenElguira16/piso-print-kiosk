import React, { FC } from 'react';
import Image from 'next/image'; 
import msWord from '../styles/ms-word.png';

type TProps = {
  nextStep: () => void;
}

const Step1: FC<TProps> = ({nextStep}) => {
  return (
    <div className="flex h-screen">
      <div className="m-auto w-2/3 text-center">
        <header className="text-8xl">Hello! Print your document here.</header>

        <div className="mt-40">
          <button className="button-primary" onClick={nextStep}>
            click here to start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
