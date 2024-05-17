import config from './app/config';
import mongoose from 'mongoose';
import app from './app';

console.log('hello');
console.log('DATABASE_URL:', config.database_url as string); // Add this line

async function main() {
  try {
    console.log('DATABASE_URL:', config.database_url as string); // Add this line
    console.log('Connecting to MongoDB:', config.database_url as string);
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port as string}`);
    });
  } catch (err) {
    console.log('An error occurred:');
    console.error(err);
  }
}

main();
