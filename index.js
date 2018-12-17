require('dotenv').config();
const handler = require('serve-handler');
const kill = require('kill-port');
const micro = require('micro');
const { execFile } = require('child_process');

const PORT = 4040;
const APP_EXE = 'XSplitVCam.exe';
const PUBLIC_FOLDER = 'build';

// call after the server is done
const startExe = () => {
  console.log(`${APP_EXE} start`);
  execFile(APP_EXE, (err, data) => {
    process.exit();
  });
};

const server = micro(async (req, res) => {
  await handler(req, res, {
    public: PUBLIC_FOLDER
  });
});

server.listen(PORT, () => {
  console.log(`static server is running at http://localhost:${PORT}`);
  startExe();
});

// while exit
process.on('exit', () => {
  console.log(`http://localhost:${PORT} server will close.`);
  // kills the port
  kill(port)
    .then(console.log)
    .catch(console.log);
});
