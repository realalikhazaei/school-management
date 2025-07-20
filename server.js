import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import authRoutes from './http/routes/authRoutes.js';
import paymentRoutes from './http/routes/paymentRoutes.js';
import HttpError from './http/utils/httpError.js';
import globalErrorHandler from './http/controllers/errorController.js';

//Creating an HTTP server
const app = express();
const httpServer = http.createServer(app);

//Adding necessary middlewares
app.use(cors(), express.json(), morgan('dev'));

//Creating and starting apollo server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await apolloServer.start();

//Routing
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use(
  '/api/v1/graphql',
  apolloMiddleware(apolloServer, {
    context: async ({ req }) => {
      return { accessToken: req.cookies?.accessToken || req.headers?.authorization || null };
    },
  }),
);

//HTTP error handling
app.use(/.*/, (req, res, next) => {
  const message = `Could not found this route ${req.originalUrl}`;
  return next(new HttpError(message, 400));
});
app.use(globalErrorHandler);

//Connecting to the database
mongoose.connection.once('open', () => {
  console.log('Connection to the database has been established'); //eslint-disable-line
});
mongoose.connection.on('error', err => {
  console.log('Could not connect to the database'); //eslint-disable-line
  console.log(err); //eslint-disable-line
});
await mongoose.connect(process.env.DATABASE_CONNECT);

//Starting the HTTP server
const port = process.env.PORT || 5000;
await new Promise(resolve => httpServer.listen(port, process.env.HOST, resolve));
console.log(`Starting the server on port ${port}`); //eslint-disable-line

//Handling unhandled rejections
process.on('unhandledRejection', err => {
  console.log('----------------------UNHANDLED REJECTION----------------------'); //eslint-disable-line
  console.log(err); //eslint-disable-line
});
