const util  = require('util');
const client = require('shodan-client');
const fs = require('fs');

const APIKEY = fs.readFileSync('.apikey', 'utf8');;

const searchOpts = {
  // facets: 'port:100,country:100',
  // minify: false,
};


const func = () =>{
client
  // .search('royal navy', APIKEY, searchOpts)
  .scan('123.456.123.111', APIKEY, searchOpts )
  // .scanResult('DVfxjUgHY6JupYDC', APIKEY, searchOpts )
  .then(res => {
    console.log('Result:');
    console.log(util.inspect(res, { depth: 6 }));
  })
  .catch(err => {
    console.log('Error:');
    console.log(err);
  });
}