import mongoose from 'mongoose';

mongoose.connection.once('open', () => {
  console.log('Connection to the database has been established'); //eslint-disable-line
});

mongoose.connection.on('error', err => {
  console.log('Could not connect to the database'); //eslint-disable-line
  console.log(err); //eslint-disable-line
});

const dbConnect = async () => {
  await mongoose.connect(process.env.DATABASE_CONNECT);
};

const dbDisconnect = async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
};

export { dbConnect, dbDisconnect };
