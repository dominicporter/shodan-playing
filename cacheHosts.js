const util  = require('util');
const client = require('shodan-client');
const yargs = require('yargs');
const fs = require('fs');

// Parameter setup stuff
const argv = yargs
    .option('ip-file', {
        alias: 'i',
        description: 'Specifies file with IP address (1 per line)',
        type: 'string',
    })
    .option('cache-file', {
        alias: 'o',
        description: 'Specifies the JSON file to cache the data in',
        type: 'string',
    })
    .help()
        .alias('help', 'h')
        .argv;

const options = {};

// Parse Params & read in source files
if (argv["ip-file"]) {
    options.ipFile = argv["ip-file"];
    console.log(`Using IP list from : ${options.ipFile}`)
  try{
    let rawdata = fs.readFileSync(options.ipFile, 'utf8');
    options.ipList = rawdata.split('\n').filter(a => a!= '');
    console.log(options.ipList)
  } catch(err) {
    console.log(err);
  }
}

if (argv["cache-file"]) {
  options.cacheFile = argv["cache-file"];
  console.log(`Using Cache file : ${options.cacheFile}`)
  try{
    const rawdata = fs.readFileSync(options.cacheFile);
    console.log(JSON.parse(rawdata))
    options.hostCache = (JSON.parse(rawdata));
  } catch {
    console.log('cache file doesnt exist, will create it.');
  }
} else {
  console.log('No cache file specified, outputting to console');
}

const APIKEY = 'L4ZzevsLoNr60HJAu4mZYvterlFob19H';



// Now do the query
const queryHosts = async (hostList, opts = {}) => {
  for (hostIp of hostList){
    try{
      result = await client.host(hostIp, APIKEY, opts);
      // console.log(result);
      options.hostCache[hostIp] = result;
    } catch(err) {
      console.log(`Error: ${hostIp}`);
      console.log(err);
    }
  }

  // console.log(options.hostCache);

  fs.writeFileSync(options.cacheFile, JSON.stringify(options.hostCache, null, 2));
}

queryHosts(options.ipList);