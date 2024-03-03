'use strict';

import fs from 'fs/promises';
import path from 'path';
import { createErrorSender } from '../../helpers/sendError.js';
import { mimeTypes } from './mimeTypes.js';
const inPublic = (filePath) => path.join('public', filePath);
const readFile = (filePath) => fs.readFile(inPublic(filePath), 'utf-8');

export async function responseStaticFiles(request, response) {
  const sendError = createErrorSender(response);
  const { url, headers } = request;
  const { pathname } = new URL(url, `http://${headers.host}`);
  const filePath = url === '/' ? 'index.html' : pathname;
  const ext = path.extname(filePath);

  try {
    const file = await readFile(filePath);

    response.setHeader('Content-Type', mimeTypes[ext] || 'text/plain');
    response.setHeader('Content-Length', Buffer.byteLength(file));

    response.end(file);
  } catch (error) {
    sendError(404, 'This page doesn\'t exist');
  }
}
