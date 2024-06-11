import config from './app/config';
import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';

let server: Server;

console.log('hello');
console.log('DATABASE_URL:', config.database_url as string); // Add this line

async function main() {
  try {
    console.log('DATABASE_URL:', config.database_url as string); // Add this line
    console.log('Connecting to MongoDB:', config.database_url as string);
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port as string}`);
    });
  } catch (err) {
    console.log('An error occurred:');
    console.error(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`unhandle rejection is detected , shutting down the server!`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`unhandle rejection is detected , shutting down the server!`);
  process.exit(1);
});
