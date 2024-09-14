import fs from 'fs';

fs.writeFile('test.txt', 'Hello World!', (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('File has been saved!');
  }
});