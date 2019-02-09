const fs = require('fs');

const findMiddleElement = (list) => {
  const middleIndex = Math.floor(list.length / 2);
  return list[middleIndex];
};

const checkPlurality = (word, symbol = '') => (word.endsWith('s') ? word : `${word}${symbol}`);

const capitalzie = word => word.toUpperCase();

const removeHiddenFiles = files => files.filter(file => !file.startsWith('.'));

export default () => {
  const files = fs.readdirSync('.');
  return capitalzie(checkPlurality(findMiddleElement(removeHiddenFiles(files))));
};
