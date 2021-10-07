import React, { FC } from 'react';

type TProps = {
  nextStep: () => void;
}

const Step4: FC<TProps> = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto flex justify-between w-5/12">
        <div className="bg-white border-8 border-gray-800 rounded-lg p-4 text-black h-80">
          <header className="font-bold text-2xl">Summary</header>
          <div className="flex flex-col justify-between h-20 mt-20">
            <div>Document: ASDADSASD.docx</div>
            <div>Size: Long Coupon</div>
            <div>Copies: 2</div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="border-8 border-gray-800 rounded-lg p-4">
            <header className="font-bold text-2xl">Amount to pay</header>
            <div>
              2.00
            </div>
          </div>
          <div className="border-8 border-gray-800 rounded-lg p-4">
            <header className="font-bold text-2xl">Inserted amount</header>
            <div>
              0.00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
