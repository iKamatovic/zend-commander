#!/usr/bin/env node
var exec = require('child_process').exec,
	fs = require('fs')
;

module.exports = function(){
        var argv = {};

        function init(a){
			argv = a;
        }

		function isString(str, callback){
			callback((typeof str === 'string') ? true: false) ;
		}

		function dir(callback){
			fs.exists(argv.f, function (exists) {
				if(!exists){
					fs.mkdir(argv.f, '0777', function(error){
						callback(error, (error) ? 'Directory for encoded project can\'t be created' : 'Directory for encoded project created');
					});
				} else {
					callback(null, 'Encode directory already exists.');
				}
			});
		}

		function project(callback){
			fs.exists(argv.p, function (exists) {
				if(exists){
					exec( argv.z + ' --recursive' + argv.p + ' ' + argv.f, function(error, stdout, stderr){
						if(error){
							callback(error, 'Project encodiing faild');
						} else {
							callback(null, 'Project successfully encoded');
						}
					});
				} else {
					callback(true, 'Project not found. Check projet peth.');
				}
			});
		}

		function push(callback){
			exec('scp '+ argv.P + ' -r ' + argv.f + ' ' + argv.s, function(error, stdout, stderr){
				var message = (error) ? 'Error: Project upload faild!' : 'Success: Project uploaded!';
				callback(error, message);
			});
		}

		return {
			init : init,
			dir : dir,
			project : project,
			isString: isString,
			push : push
		};
	}();


