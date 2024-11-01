'use server'
import { Worker } from "worker_threads";

export async function worker(fileName, fileData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./lib/worker.mjs');
    const ID = worker.threadId;

    worker.postMessage({ fileName, fileData });

    worker.on('message', async msg => {
      // console.log(`Message from worker ${ID}: ${msg}`);
      await worker.terminate();
      resolve(msg);
    });

    worker.on('error', error => {
      console.error(`Error from worker ${ID}: ${error}`);
      reject();
    });

    worker.on('exit', code => {
      console.log(`worker is done with code ${code}`);
    });
  })
}