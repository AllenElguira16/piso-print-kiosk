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

const Step3: FC<TProps> = ({nextStep, prevStep, loadFile, file, printInfoChange, printInfo, socket}) => {

  const openFile = () => {
    socket.emit('open-file', { filepath: file.path });
  }

  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto flex flex-col justify-between w-5/12 gap-4">
          <div className="flex justify-between gap-4">
            <div className="card w-full">
              <header>Sizes</header>
              <div className="flex flex-1 items-center gap-1">
                <input id="short-coupon" type="radio" name="coupon" value="short" onChange={printInfoChange} defaultChecked />
                <label htmlFor="short-coupon">Short Coupon</label>
              </div>
              <div className="flex flex-1 items-center gap-1">
                <input id="long-coupon" type="radio" name="coupon" value="long" onChange={printInfoChange} />
                <label htmlFor="long-coupon">Long Coupon</label>
              </div>
            </div>
            <div className="card">
              <header>Copies</header>
              <div className="text-black">
                <input type="number" className="border border-black" name="copies" onChange={printInfoChange} value={printInfo.copies} />
              </div>
            </div>
          </div>
          <div>
            <div className="card">
              <label htmlFor="file-input">
                <header className="flex justify-between">
                  <span>Select Document</span>
                  { file !== undefined && <button className="button-secondary small" onClick={openFile}>Open File</button> }
                </header>
                <div className="relative">
                  <b className="absolute w-full top-20 inset-x-0 text-xs text-center leading-4 z-10">
                    { file !== undefined && file.name }
                  </b>
                  <div className="flex flex-1 justify-center">
                    <Image className="cursor-pointer" src={ file === undefined ?  folderOpenIcon : folderCloseIcon } alt="MS Word Logo" />
                  </div>
                </div>
              </label>
              <input type="file" id="file-input" className="hidden" onChange={loadFile} accept=".xls,.xlsx,.doc,.docx,.pdf" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 left-4">
        <div className="flex justify-between">
          <button className="button-secondary" onClick={prevStep}>
            Prev
          </button>
          {file !== undefined && (
            <button className="button-primary" onClick={nextStep}>
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Step3;
