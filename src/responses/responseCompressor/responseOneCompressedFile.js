'use strict';

import fs from 'fs';
import { createCompress } from '../../modules/compression/createCompress.js';
import { setContentAttachment } from '../../helpers/setContentAttachment.js';
import { getExt } from '../../modules/compression/getExt.js';

export function responseOneCompressedFile(response, files, compressFormat) {
  const file = fs.createReadStream(files[0].filepath);
  const compressedFile = createCompress(compressFormat);
  const fileName = files[0].originalFilename;

  setContentAttachment(response, `${fileName}.${getExt(compressFormat)}`);
  response.on('close', () => compressedFile.destroy());

  file.pipe(compressedFile).pipe(response);
}
