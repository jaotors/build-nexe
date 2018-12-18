require('dotenv').config();
const handler = require('serve-handler');
const micro = require('micro');
const spawn = require('child_process').spawn;

// call after the server is done
const startExe = () => {
  console.log(`${process.env.APP_EXE} start`);
  const proc = spawn(APP_EXE, {
    shell: true
  });

  proc.on('exit', () => {
    process.exit();
  });
};

const server = micro(async (req, res) => {
  await handler(req, res, {
    public: `${process.env.PUBLIC_FOLDER}`
  });
});

server.listen(process.env.PORT, () => {
  console.log(
    `static server is running at http://localhost:${process.env.PORT}`
  );
});

process.on('uncaughtException', err => {
  console.log('err on uncaughtException', err);
});

process.on('error', err => {
  console.log('process on error: ', err);
});

// while exit
process.on('exit', () => {
  console.log(`http://localhost:${process.env.PORT} server will close.`);
});

startExe();
