'use strict';

import http from 'http';

/* eslint-disable max-len */
import { responseCompressor } from './responses/responseCompressor/index.js';
import { responseStaticFiles } from './responses/responseStaticFiles/index.js';

export function createServer() {
  const server = http.createServer((request, response) => {
    if (request.url === '/compress') {
      responseCompressor(request, response);
    } else {
      responseStaticFiles(request, response);
    }
  });

  /* eslint-disable-next-line no-console */
  server.on('error', console.error);

  return server;
}
