var _ = require('lodash'),
    async = require('async'),
    fs = require('fs'),
    path = require('path');

function readDirectory(directory, prefix, handler, callback) {
    
    fs.readdir(directory, function(err, files) {
        if (err) return callback(err);
        
        var results = {};
        
        async.forEach(
            files,
            function(file, done) {
                
                var filePath = path.join(directory, file);
                
                // Stat the file to determine if directory or file
                fs.stat(filePath, function(err, stats) {
                    if (err) return done(err);
                    
                    // If a directory, then read the contents of that directory
                    if (stats.isDirectory()) {
                        readDirectory(filePath, prefix + file + '/', handler, function(err, includes) {
                            if (err) return done(err);
                            results = _.extend(results, includes);
                            done();
                        });
                    } else {
                        // Include the file and process it using the handler
                        try {
                            var include = handler(path.join(directory, file));
                            results[prefix + file] = include;
                            return done();
                        } catch (e) {
                            return done(e);
                        }
                    }
                });
                
            },            
            function(err) {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    });
}

module.exports = function(includeDir, opts, callback) {
    
    if (!callback && typeof opts == 'function') {
        callback = opts;
        opts = {};
    }
    opts = opts || {};
    
    var handler = opts.handler || require;    
    readDirectory(includeDir, '', handler, callback);
}