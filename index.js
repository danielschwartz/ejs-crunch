/**
 * EJS Crunch - Crunches EJS templates into library-independent functions.
 * 
 * Includes: Middleware for Connect-Assetmanager, standalone file export function
 *
 * @link	 	http://github.com/danielschwartz/ejs-crunch
 * @author: 	Daniel Schwartz
*/

var wrench 	= require('wrench'),
	fs 		= require('fs'),
	ejs 	= require('ejs'),
	_ 		= require('underscore'),
	jsp 	= require("uglify-js").parser;
	pro 	= require("uglify-js").uglify;

var FILE_TYPE = 'ejs';


module.exports = function(options){
	var fileSource = buildFile(options.files, options.fileType);

	if(options.connectPremanipulate){
		return function(file, path, index, isLast, callback){
			callback(fileSource + file);
		};
	}

	return fileSource;
}

// /* Private Functions */

function buildFile(files, fileType){
	var extension = fileType || FILE_TYPE,
		viewFiles;
	
	if(typeof files === 'string'){
		viewFiles = getAllFilesForType(files, extension);
	} else {
		viewFiles = files;
	}

	var fileContents = 'var Templates = {}; \n\n'; 

	_.each(viewFiles, function(path){
		var file = fs.readFileSync(path),
			templateFunction = ejs.compile(file.toString(), {
				client: true
			}),
			ast = jsp.parse(templateFunction.toString()),
			code = pro.gen_code(ast, {beautify: true});
		
		fileContents += 'Templates["' + path + '"] = ' + code + '; \n\n';
	});

	return fileContents;
}

function getAllFilesForType(dir, fileType){
	var files = wrench.readdirSyncRecursive(dir),
		components = [];

	_.each(files, function(file){
	   	var fileArr = file.split('/'),
	   		fileName = fileArr[fileArr.length - 1];

	   	fileArr = fileName.split('.');

		if(fileArr.length > 1 && fileArr[fileArr.length - 1] === fileType){
			components.push(dir +'/'+ file);
		}
	});

	return components;
}