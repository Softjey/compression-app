import { responseCompressor } from '../src/responses/responseCompressor/index.js';
import { responseStaticFiles } from '../src/responses/responseStaticFiles/index.js';

export default function handler(request, response) {
  if (request.url === '/api/compress') {
    responseCompressor(request, response);
  } else {
    responseStaticFiles(request, response);
  }
}
