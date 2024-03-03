'use strict';

import fs from 'fs';
import archiver from 'archiver';
import { createCompress } from '../../modules/compression/createCompress.js';
import { getExt } from '../../modules/compression/getExt.js';
import { setContentAttachment } from '../../helpers/setContentAttachment.js';

export function responseCompressedFiles(response, files, compressFormat) {
  const archive = archiver('zip');

  response.on('close', () => archive.destroy());
  setContentAttachment(response, `${files.length}-files.zip`);

  files.forEach(file => {
    const newExt = getExt(compressFormat);
    const fileStream = fs.createReadStream(file.filepath);
    const compressStream = createCompress(compressFormat);

    fileStream.pipe(compressStream);

    archive.append(compressStream, {
      name: `${file.originalFilename}.${newExt}`,
    });
  });

  archive.pipe(response);
  archive.finalize();
}
