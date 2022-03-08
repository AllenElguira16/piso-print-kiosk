import React, { ChangeEvent, FC } from 'react';
import Image from 'next/image'; 
import folderOpenIcon from '../styles/folder-open.png';
import folderCloseIcon from '../styles/folder-close.png';
import { Socket } from 'socket.io-client';

type TProps = {
  socket: Socket;
  prevStep: () => void;
  nextStep: () => void;
  loadFile: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  printInfoChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  file: File;
  printInfo: {
    coupon: string;
    copies: number;
  };
}

const Step3: FC<TProps> = ({nextStep, prevStep, loadFile, file, printInfoChange, printInfo}) => {
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto flex justify-between w-5/12">
          <div className="border-8 border-gray-800 rounded-lg p-4">
            <label htmlFor="file-input">
              <header>Select Document</header>
              <div className="relative">
                <b className="absolute w-full top-20 inset-x-0 text-xs text-center leading-4 z-10">
                  { file !== undefined && file.name }
                </b>
                <Image className="cursor-pointer" src={ file === undefined ?  folderOpenIcon : folderCloseIcon } alt="MS Word Logo" />
              </div>
            </label>
            <input type="file" id="file-input" className="hidden" onChange={loadFile} accept=".doc,.docx,.pdf" />
          </div>
          <div className="flex flex-col justify-between">
            <div className="border-8 border-gray-800 rounded-lg p-4">
              <header>Sizes</header>
              <div>
                <input id="short-coupon" type="radio" name="coupon" value="short" onChange={printInfoChange} defaultChecked />
                <label htmlFor="short-coupon">Short Coupon</label>
              </div>
              <div>
                <input id="long-coupon" type="radio" name="coupon" value="long" onChange={printInfoChange} />
                <label htmlFor="long-coupon">Long Coupon</label>
              </div>
            </div>
            <div className="border-8 border-gray-800 rounded-lg p-4">
              <header>Copies</header>
              <div className="text-black">
                <input type="number" className="border border-black" name="copies" onChange={printInfoChange} value={printInfo.copies} />
              </div>
            </div>
          </div>
        </div>
        {/* <button className="absolute " onClick={nextStep}>Next</button> */}
      </div>
      <div className="absolute bottom-4 right-4 left-4">
        <div className="flex justify-between">
          <button className="border-8 border-gray-800 rounded-full right-4 bottom-4 w-16 h-16" onClick={prevStep}>
            Prev
          </button>
          {file !== undefined && (
            <button className="border-8 border-gray-800 rounded-full right-4 bottom-4 w-16 h-16" onClick={nextStep}>
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Step3;
