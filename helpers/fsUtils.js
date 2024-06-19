const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`Data written to ${destination}\n`)
  );

// Use promisify to use .then() to make sure the function runs after the write process has completed not during or before.
const updateFile = util.promisify(writeToFile);

/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      console.info(`Added note ${JSON.stringify(content)}\n`);
      writeToFile(file, parsedData);
    }
  });
};

const deleteAndRewrite = (id, file) => {
  readFromFile(file).then((data) =>{

      data =JSON.parse(data);
      if(data){
      // Loop through db.json to see if such note id exists
          for(let i = 0; i < data.length; i++){
              
              if(data[i].id === id){
                  // Splice to remove if it exists then rewrite db.json to reflect change
                  console.info(`Deleted note ${JSON.stringify(data[i])}\n`);
                  data.splice(i, 1);
                  updateFile(file, data).then( () => {
                   
                    const response = {
                      status: 'success',
                      body: data,
                  };
                  return response;
              });


              }
              else{
                  if(i === data.length - 1){
                      const response = 'Note ID not found! No actions was taken.';
                      return response;
              }
  
          }}
  }else
  {
      const response = 'There are currently no existing notes!';
      return response;
  }
    
  } );
}

module.exports = { readFromFile, writeToFile, readAndAppend, deleteAndRewrite };
