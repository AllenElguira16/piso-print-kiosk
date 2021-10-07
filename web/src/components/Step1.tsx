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
          <div>click here to start</div>
          <button className="w-10 h-10 bg-white border-gray-800 rounded-full" onClick={nextStep} />
        </div>
      </div>
    </div>
  );
};

export default Step1;
