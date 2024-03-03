'use strict';

const maxFileSize = 10 * 1024 ** 3;

export const options = {
  maxFileSize,
  maxTotalFileSize: maxFileSize,
};
