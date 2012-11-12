#inclusive


Ultra simple utility to make it easier to do something with a whole pile of files in a directory. Ie. Including them in a require, etc... This doesn't do a lot of things, and is mainly to save me from repeating myself :)

### Todo

* Possible reimplement using fstream, and make it emit the events (allow filters, etc)

### Installation

```npm install inclusive```

### Usage

To require all the files in a directory
``` 
var inclusive = require('inclusive'),
    path = require('path');
    
// Include all the handlers in the handlers directory
inclusive(path.join(__dirname, 'handlers', function(err, includes) {
   
   // Results
   // { relative_file_path: file exports }
    
});
```

To do something else with all the files
```
var inclusive = require('inclusive'),
    path = require('path');
    
inclusive(path.join(__dirname, 'files', {handler: function(filePath) { return filePath; }, function(err, files) {
    // Results
    // { relative_file_path: absolute_file_path }
});
```