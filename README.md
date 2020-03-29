# Shodan info processor

This is a set of sctipts to query Shodan.io, save the info and process it to extract useful info.

## Setup

* Install latest Node (tested with v13.12.0)
* Get a Shodan API key and put it in a file called `.apikey`
* `npm i`

## Usage

### Downloading and caching the known info for a list of IPs:
- Put the address in a text file (eg iplist.txt), 1 per line.
- `node cacheHosts.js -i iplist.txt -o shodanHosts.json`
- This should create `shodanHosts.json` and fill it with the data from Shodan

### Getting interesting info from the cache:
- Run the `cacheHosts` script first.
- `node queryHosts.js -o shodanHosts.json`
- This currently outputs details of any hosts with known vulnerabilities like this:

```
61.212.86.132 
1 endpoints have known vulnerabilities
        Product: Microsoft IIS httpd
        Version: 7.5
        CVE-2010-1899,CVE-2010-2730,CVE-2010-3972,CVE-2012-2531,CVE-2012-2532,CVE-2010-1256
```

## Further Development

See details of the JS Library here: https://github.com/jesusprubio/shodan-client and the Shodan API here: https://developer.shodan.io/api