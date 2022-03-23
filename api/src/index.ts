import Express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import usbDetect from 'usb-detection';
import Board from './board';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const PDFParser = require('pdf2json');

(async () => {
  // Initialize Express Server
  const app = Express();
  // Initialize Main Server with Express
  const server = http.createServer(app);
  // Initialize Socket server by using the main server
  const io = new Server(server, {
    cors: {
      origin: '*',
    }
  });
  // Start Arduino Interface
  Board.start(io);
  // Start all server using port 8000
  server.listen(8000, () => console.log('server started on port 8000'));
  io.listen(server);

  // Listens to any connection from app
  io.on('connection', function (socket) {
    // Start USB Monitoring
    usbDetect.startMonitoring();
    // Detect if USB is added
    usbDetect.on('add', () => {
      socket.emit('usb-connected');
    });

    type PrintArgs = { 
      filepath: any;
      printInfo: {
        coupon: string;
        copies: number;
      } 
    } 
    // If client gives an file and coins enough to print
    // Will start the service
    socket.on('prepare-printing', async (args: PrintArgs) => {
      // Start Printing via powershell
      // *Note that the current supported OS is windows 10
      exec(`Start-Process -FilePath "${args.filepath}" -Verb Print`, {'shell':'powershell.exe'}, (error, stdout, stderr) => {
        if (error) console.error(error);

        if (stderr) console.log(stderr);
        if (stdout) console.log(stdout);

        socket.emit('start-printing');
        console.log(`Start Printing: ${args.filepath}`);
      });
    });

    socket.on('open-file', async (args: PrintArgs) => {
      exec(`Invoke-Item "${args.filepath}"`, {'shell':'powershell.exe'}, async (error, stdout, stderr) => {
        if (error) console.error(error);

        if (stderr) console.log(stderr);
        if (stdout) console.log(stdout);

        console.log(`File Opened: ${args.filepath}`);
      });
    });

    socket.on('get-pages', async (args: PrintArgs) => {
      const pdfParser = new PDFParser();

      const filename = path.parse(args.filepath).name;
      const ext = path.parse(args.filepath).ext;

      if (ext === 'pdf') {
        pdfParser.loadPDF(args.filepath);
      } else {
        exec(`cd ${path.join(__dirname, 'temp')} && "C:\\Program Files\\LibreOffice\\program\\soffice.exe" --convert-to pdf "${args.filepath}"`, async (error, stdout, stderr) => {
          if (error) console.error(error);
  
          if (stderr) console.log(stderr);
          if (stdout) console.log(stdout);
  
          const pdfPath = path.join(__dirname, 'temp', filename + '.pdf');
  
          pdfParser.loadPDF(pdfPath);
  
          fs.unlinkSync(pdfPath);
        });
      }

      pdfParser.on('pdfParser_dataReady', function(data: any) {
        const pageCount = data.Pages.length;
        socket.emit('file-loaded', { pages: pageCount });
      });
    });
    
    
  })
})();
