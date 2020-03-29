const util = require('util');
const client = require('shodan-client');
const yargs = require('yargs');
const fs = require('fs');

const APIKEY = fs.readFileSync('.apikey', 'utf8');;

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
  try {
    let rawdata = fs.readFileSync(options.ipFile, 'utf8');
    options.ipList = rawdata.split('\n').filter(a => a != '');
    console.log(options.ipList)
  } catch (err) {
    console.log(err);
  }
}

if (argv["cache-file"]) {
  options.cacheFile = argv["cache-file"];
  console.log(`Using Cache file : ${options.cacheFile}`)
  try {
    const rawdata = fs.readFileSync(options.cacheFile);
    console.log(Object.keys(JSON.parse(rawdata)).length, ' addresses in cache')
    options.hostCache = (JSON.parse(rawdata));
  } catch (err){
    console.log(err);
    console.log('cache file doesnt exist, will create it.');
  }
} else {
  console.log('No cache file specified, outputting to console');
}


// Now do the query
 (async () => {
  for (hostIp of options.ipList) {
    if (!options.hostCache[hostIp]) {
      try {
        result = await client.host(hostIp, APIKEY);
        // console.log(result);
        options.hostCache[hostIp] = result;
      } catch (err) {
        console.log(`Error: ${hostIp} - ${err.message}`);
      }
    } else {
      console.log(`Skipping already cached Address: ${hostIp}`);
    }
  }

  fs.writeFileSync(options.cacheFile, JSON.stringify(options.hostCache, null, 2));
})()