import IORedis from 'ioredis';
import { Queue, Worker } from 'bullmq';

const redisOptions = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASS,
};

const connectionQueue = new IORedis(redisOptions);
const connectionWorker = new IORedis({
  maxRetriesPerRequest: null,
  ...redisOptions,
});

/**
 *
 * @param {String} queueName
 * @param {object[]} dataArray
 * @param {Function} func
 */
const queueJob = async function (queueName, dataArray, func) {
  const queue = new Queue(queueName, { connection: connectionQueue });

  for (const each of dataArray) {
    await queue.add('job', each, {
      attempts: 5,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: true,
      removeOnFail: false,
    });
  }

  const worker = new Worker(
    queueName,
    async job => {
      try {
        await func(job.data);
      } catch (error) {
        console.log(job, error); //eslint-disable-line
      }
    },
    { connection: connectionWorker },
  );
};

export default queueJob;
