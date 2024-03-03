/* eslint-disable max-len, object-curly-newline, no-console */
'use strict';

import formidable from 'formidable';
import { responseOneCompressedFile } from './responseOneCompressedFile.js';
import { responseCompressedFiles } from './responseCompressedFiles.js';
import { handleResponsePrediction } from '../../modules/sizePrediction/handleResponsePrediction.js';
import { ErrorHandler } from './ErrorHandler.js';
import { errorMessage } from '../../constants/errors.js';
import { options } from './options.js';

export async function responseCompressor(request, response) {
  const errorHandler = new ErrorHandler(response);
  const form = formidable(options);

  if (request.method.toUpperCase() !== 'POST') {
    return errorHandler.sendError(400, errorMessage.onlyPOSTSupport);
  }

  try {
    const [fields, allFiles] = await form.parse(request);
    const compressionFormat = fields['compressionType'] ? fields['compressionType'][0] : null;
    const files = allFiles['file'] || [];

    if (errorHandler.hasError(compressionFormat, files)) {
      return errorHandler.sendInvalidError(compressionFormat, files);
    }

    handleResponsePrediction(files, response);

    if (files.length > 1) {
      responseCompressedFiles(response, files, compressionFormat);
    } else {
      responseOneCompressedFile(response, files, compressionFormat);
    }
  } catch (error) {
    return errorHandler.detectTypeAndSendError(error);
  }
}
