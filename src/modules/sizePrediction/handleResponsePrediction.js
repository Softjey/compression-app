'use strict';

import { predictCompressedSize } from './predictCompressedSize.js';

export function handleResponsePrediction(files, response) {
  const prediction = predictCompressedSize(files);

  response.setHeader('Predicted-Length', prediction);
}
