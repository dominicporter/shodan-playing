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
  .scan('94.236.30.16,  195.130.1.242,  195.130.1.246,  195.130.1.236,  195.130.1.239,  137.116.195.101,  137.116.195.101,  81.145.28.200,  81.145.28.200,  81.145.28.200,  81.145.28.202,  81.145.28.202,  81.145.28.202,  195.130.1.241,  195.130.1.244,  104.125.12.157,  104.74.54.118,  104.71.156.26,  94.236.30.201,  185.13.50.196', APIKEY, searchOpts )
  // .scanResult('DVfxjUgHY6JupYDC', APIKEY, searchOpts )
  // .scanResult('tzJaLlpFmKCfDcjS', APIKEY, searchOpts )
  .then(res => {
    console.log('Result:');
    console.log(util.inspect(res, { depth: 6 }));
  })
  .catch(err => {
    console.log('Error:');
    console.log(err);
  });
}