const fs = require('fs');

const findMiddleElement = (list) => {
  const middleIndex = Math.floor(list.length / 2);
  return list[middleIndex];
};

const checkPlurality = (word, symbol = '') => (word.endsWith('s') ? word : `${word}${symbol}`);

const capitalize = word => word.toUpperCase();

const removeHiddenFiles = files => files.filter(file => !file.startsWith('.'));

export default () => {
  const files = fs.readdirSync('.');
  const realFiles = removeHiddenFiles(files);
  const centeredRealFile = findMiddleElement(realFiles);
  const capitalizedAndCheckedFile = capitalize(checkPlurality(centeredRealFile));
  return capitalizedAndCheckedFile;
};
