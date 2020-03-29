const util = require('util');
const client = require('shodan-client');
const yargs = require('yargs');
const fs = require('fs');


// Parameter setup stuff
const argv = yargs
  .option('cache-file', {
    alias: 'o',
    description: 'Specifies the JSON file to cache the data in',
    type: 'string',
  })
  .demandOption(['cache-file'], 'Please provide a cache file')
  .help()
  .alias('help', 'h')
  .argv;

const options = {};

// Parse Params & read in source files
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
  console.log('No cache file specified... use -o');
}


// Now do the query
(async () => {
  for ([hostIp, hostInfo] of Object.entries(options.hostCache)){
    // console.log(hostIp, Object.keys(hostInfo), hostInfo.data.length)
    const withVulns = hostInfo.data.filter(d => d.vulns)
    if (withVulns.length > 0) console.log('\n', hostIp, withVulns.length?`\n${withVulns.length} endpoints have known vulnerabilities`:'')
    for (ep of withVulns){
      console.log(`\tProduct: ${ep.product}\n`, `\tVersion: ${ep.version}\n`, `\t${Object.keys(ep.vulns)}`)
    }
  };
})()