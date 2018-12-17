require('dotenv').config();
const handler = require('serve-handler');
const kill = require('kill-port');
const micro = require('micro');
const { execFile } = require('child_process');
const port = process.env.LOCAL_PORT;

// call after the server is done
const startExe = () => {
  console.log(`${process.env.APP_EXE} start`);
  execFile(`${process.env.APP_EXE}`, (err, data) => {
    process.exit();
  });
};

const server = micro(async (req, res) => {
  await handler(req, res, {
    public: `${process.env.PUBLIC_FOLDER}`
  });
});

server.listen(port, () => {
  console.log(`static server is running at http://localhost:${port}`);
  startExe();
});

// while exit
process.on('exit', () => {
  console.log(`http://localhost:${port} server will close.`);
  // kills the port
  kill(port)
    .then(console.log)
    .catch(console.log);
});
