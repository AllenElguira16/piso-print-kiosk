import electron from 'electron';
import type { NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
import Step1 from '../components/Step1'
import Step2 from '../components/Step2'
import Step3 from '../components/Step3'
import Step4 from '../components/Step4'
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const Home: NextPage = () => {
  const [currentStep, setStep] = useState(1);
  const [printInfo, setPrintInfo] = useState({
    coupon: 'short',
    copies: 1,
    pages: 1,
  });
  const [file, setFile] = useState<File>(undefined);

  const loadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const filepath = event.currentTarget.files[0];
    socket.emit('get-pages', { filepath: filepath.path });

    setFile(filepath);
  }

  const onChangeSetPrintInfo = async (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.currentTarget;
    setPrintInfo({ 
      ...printInfo,
      [name]: value
    });
  }

  useEffect(() => {
    socket.on('file-loaded', ({ pages }) => {
      setPrintInfo({
        ...printInfo,
        pages
      })
    });
  }, []);

  return (
    <>
      {currentStep === 1 && (
        <Step1 nextStep={() => setStep(currentStep + 1)}/>
      )}
      {currentStep === 2 && (
        <Step2 socket={socket} prevStep={() => setStep(currentStep - 1)} nextStep={() => setStep(currentStep + 1)}/>
      )}
      {currentStep === 3 && (
        <Step3 
          socket={socket}
          prevStep={() => setStep(currentStep - 2)} 
          nextStep={() => setStep(currentStep + 1)}
          printInfoChange={onChangeSetPrintInfo}
          printInfo={printInfo}
          loadFile={loadFile}
          file={file}
        />
      )}
      {currentStep === 4 && (
        <Step4
          start={() => {
            setStep(1);
            setPrintInfo({
              coupon: 'short',
              copies: 1,
              pages: 1,
            })
            setFile(undefined);
          }}
          socket={socket}
          prevStep={() => setStep(currentStep - 1)}
          printInfo={printInfo}
          file={file}
        />
      )}
    </>
  )
}

export default Home
