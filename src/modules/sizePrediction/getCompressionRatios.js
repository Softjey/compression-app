'use strict';

import { compressionRatios } from './compressionRatios.js';

export function getCompressionRatios(extension) {
  return compressionRatios[extension] || 1;
}
