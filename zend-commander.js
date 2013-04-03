#!/usr/bin/env node
var argv = require('optimist')
	 .usage('Encode PHP project and push to server...')
	 .demand('p')
	 .describe('p', 'Project path')
	 .describe('f', 'Path of encoded project')
	 .describe('s', 'User and IP address of host')
	 .describe('P', 'Host port')
	 .describe('z', 'Path to zendec5 script')
	 .default('f', process.env['HOME'] +'/zend-commander-project')
	 .default('P', '')
	 .default('z', '/usr/local/Zend/zendenc5')
	 .argv,

   zend = require('./lib/zend-commander')
;

zend.init(argv);

zend.dir(function(error, response){
	if(error) {console.log(response); return;}
	console.log(response);

	zend.project(function(error, response){
		if(error) {console.log(response); return;}
		console.log(response);
		if(argv.s){
			zend.push(function(error, response){
				console.log(response);
			});
		}
	});
});


