EJS-Crunch
==========

Crunches EJS templates into library-independent functions, meaning you don't have to have EJS on the client-side

There are two ways to use this module. It will integrate directly as a connect-assetmanager premanipulate function (it will prepend the code to the file) or you can simply export the file contents to a string and write them to disk )or do whatever else you want)

# Usage

## Options

```
{

	files: 					/* 
							 * STRING or ARRAY
							 * Either a string that represents a path (will recursivly walk the dir), 
							 * or an array of strings representing paths (is not recursive)
							 */

	connectPremanipulate:   /* 
							 * BOOLEAN
	        				 * Whether the return type should 
						     * be of Connect Assetmanager Premanipulate function 
						     * or string of file contents 
						     */
}
```

## Connect Assetmanager Premanipulate

In your assetsGroups creation file put the following in whatever assetGroup you'd like to prepend the templates to:

```
preManipulate: {
		    	'^': [
		    		require('ejs-crunch')({
		    			files: './views/partials',
		    			connectPremanipulate: true
		    		})
		    	]
		    }
```

## Simple file string export

```
// To get file Source
var fileSource = require('ejs-crunch')({
    files: __dirname + '/views/partials'
});


// Then do something like write to a file, so gruntjs can use it
fs.writeFileSync('./static/test.js', fileContents);
```

# TODO

 * Use async to create a concurrent file reading queue (make whole library run in async rather than sync)
 * Add option to name global Templates object
 * Possibly internalize the fileWriting as an option
 * Add support for other libraries?