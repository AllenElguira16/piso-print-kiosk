import React, { FC } from 'react';
import Image from 'next/image'; 
import msWord from '../styles/ms-word.png';

type TProps = {
  nextStep: () => void;
}

const Step3: FC<TProps> = ({nextStep}) => {
  return (
    <div className="flex h-screen">
      <div className="m-auto flex justify-between w-5/12">
        <div className="border-8 border-gray-800 rounded-lg p-4">
          <header>Selected Document</header>
          <Image src={msWord} alt="MS Word Logo" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="border-8 border-gray-800 rounded-lg p-4">
            <header>Sizes</header>
            <div>
              <input id="short-coupon" type="radio" name="size" value="short" />
              <label htmlFor="short-coupon">Short Coupon</label>
            </div>
            <div>
              <input id="long-coupon" type="radio" name="size" value="long" />
              <label htmlFor="long-coupon">Coupon</label>
            </div>
          </div>
          <div className="border-8 border-gray-800 rounded-lg p-4">
            <header>Copies</header>
            <div>
              <input type="number"  />
            </div>
          </div>
        </div>
      </div>
      <button className="absolute border-8 border-gray-800 rounded-full right-4 bottom-4 w-16 h-16" onClick={nextStep}>Next</button>
    </div>
  );
};

export default Step3;
