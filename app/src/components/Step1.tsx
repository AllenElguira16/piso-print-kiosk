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
          <button className="border-8 border-gray-800 rounded-full right-4 bottom-4 w-48 h-16" onClick={nextStep}>
            click here to start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
