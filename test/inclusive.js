var path = require('path'),
    should = require('chai').should(),
    inclusive = require('..');

describe('Inclusive', function() {
    
    it('should be able to import a directory using default requires', function(done) {
        inclusive(path.join(__dirname, '/fixtures'), function(err, includes) {
            if (err) return done(err);
            includes.should.have.property('test1.js');
            includes.should.have.property('test2.js');
            includes.should.have.property('deep/test3.js');
            includes['test1.js'].name.should.equal('1');
            done();
        });        
    });
    
    it('should return an error when attempting to import a dodgy directory', function(done) {
        inclusive('jasdasd', function(err) {
            if (err) return done();
            return done('Did not throw error');
        })
    });
    
    it('should be able to provide a custom handler', function(done) {
        
        var opts = {
            handler: function(filePath) {
                return filePath;
            }
        };
        
        inclusive(path.join(__dirname, '/fixtures'), opts, function(err, includes) {
            if (err) return done(err);
            includes.should.have.property('test1.js', path.join(__dirname, 'fixtures', 'test1.js'));
            done();
        });
    });    
});