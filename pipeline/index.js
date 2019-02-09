import fs from 'fs';

const middle = (list) => {
  const middleIndex = Math.floor(list.length / 2);
  return list[middleIndex];
};

const plural = (word, symbol) => (word.endsWith('s') ? word : `${word}${symbol}`);

export default () => {
  const files = fs.readdirSync('.');

  const sortedNotHiddenFiles = files.filter(file => !file.startsWith('.')).sort();

  const middleFile = middle(sortedNotHiddenFiles);
  const pluralUpperCaseNameOfFile = plural(middleFile).toUpperCase();
  console.log(pluralUpperCaseNameOfFile);
};
