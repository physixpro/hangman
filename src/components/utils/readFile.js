const {readFileSync, promises: fsPromises} = require('fs');

async function asyncReadFile(filename) {
    try {
      const contents = await fsPromises.readFile(filename, 'utf-8');
  
      const arr = contents.split(/\r?\n/);
  
      console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']
  
      return arr;
    } catch (err) {
      console.log(err);
    }
  }
  
  export default asyncReadFile