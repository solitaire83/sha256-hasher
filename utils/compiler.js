const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../compiled');
if(!fs.existsSync(dir))
{
  fs.mkdirSync(dir);
  console.log('There was no compiled directory, so i created one. :3');
}