const util  = require('util');
const client = require('shodan-client');

const searchOpts = {
  // facets: 'port:100,country:100',
  // minify: false,
};

const APIKEY = 'L4ZzevsLoNr60HJAu4mZYvterlFob19H';

const queryHosts = async (hostList, opts = {}) => {
  hostList.forEach(async hostIp => {
    try{
    console.log(await client.host(hostIp, APIKEY, opts));
    } catch(err) {
      console.log('Error:');
      console.log(err);
    }
  });
}

queryHosts(['94.236.30.16',  '195.130.1.242'])