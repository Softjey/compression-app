'use strict';

import zlib from 'zlib';

export function createCompress(compressionType) {
  switch (compressionType) {
    case 'gzip':
      return zlib.createGzip();
    case 'deflate':
      return zlib.createDeflate();
    case 'brotli':
      return zlib.createBrotliCompress();
    default:
      throw new Error(`Unsupported compression type: ${compressionType}`);
  }
}
