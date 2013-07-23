#!/usr/bin/env node

/*
Automatically grade files for the presence of specified HTML tags/attributes.
Uses commander.js and cheerio. Teaches command line application development and
basic DOM parsing. 

References:

+ Cheerio
    - https://github.com/MattewMueller/cheerio

+ Commander.js
    - https://github.com/visionmedia/commander.js

+JSON
    - https://developer.mozilla.org/en-US/docs/JSON

*/

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var rest = require('restler');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json"; 

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
	console.log("%s does not exist. Exiting.", instr);
	process.exit(1);
    }
    return instr;
};

var cheerioHtmlFile = function(htmlfile) { 
    return cheerio.load(fs.readFileSync(htmlfile));
}; 


var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(url, htmlfile, checksfile) {
    var checks = loadChecks(checksfile).sort();
    var out = {};
    if(htmlfile) {
	$ = cheerioHtmlFile(htmlfile);
	for(var ii in checks) {
	    var present = $(checks[ii]).length > 0;
	    out[checks[ii]] = present;	
	}
	var outJson = JSON.stringify(out, null, 4);
	console.log(outJson);
    }
    else {
	rest.get(url).on('complete', function(data) {
	    var dataout  = data;
	    $ = cheerio.load(dataout);
	    for(var ii in checks) {
		var present = $(checks[ii]).length > 0;
		out[checks[ii]] = present;
	    }
	    var outJson = JSON.stringify(out, null, 4);
	    console.log(outJson);
	});
    }
    return;
};

var clone = function(fn) {
    return fn.bind({});
};

if(require.main == module) {
    program
	.option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
	.option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
	.option('-u, --url <url>', 'URL do index.html')
	.parse(process.argv);
    checkHtmlFile(program.url, program.file, program.checks);
} else {
    exports.checkHtmlFile = checkHtmlFile;
} 
 
 
 
