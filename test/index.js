var assert = require('assert');
var Metalsmith = require('metalsmith');
var lunr = require('../lib/index');

describe('metalsmith-lunr', function(){
  it('should add JSON index file to metadata', function(done){
    var metalsmith = Metalsmith('test/fixtures/basic');
    metalsmith
      .use(lunr())
      .build(function(err, files){
        if (err) return done(err);
        assert.equal(typeof files['searchIndex.json'], 'object');
        assert.equal(typeof files['searchIndex.json'].contents, 'object');
        assert.equal(Object.keys(files).length, 4);
        done();
      });
  });

  it('should default options correctly', function(done){
    var metalsmith = Metalsmith('test/fixtures/basic');
    metalsmith
      .use(lunr())
      .build(function(err, files){
        if (err) return done(err);
        index = JSON.parse(files['searchIndex.json'].contents);
        assert.equal(index.fields[0], 'contents');
        done();
      });
  });

  it('should use inputed options', function(done){
    var metalsmith = Metalsmith('test/fixtures/basic');
    metalsmith
      .use(lunr({
        fields: {title:10, tags:100, contents: 1},
        ref: 'title',
        indexPath: 'index.json'
      }))
      .build(function(err, files){
        if (err) return done(err);
        index = JSON.parse(files['index.json'].contents);
        console.log(index.fieldVectors[1][0]);
        assert.equal(index.fields.length, 3);
        assert.equal(index.fields[0], 'title');
        assert.equal(index.fields[1], 'tags');
        assert.equal(index.fieldVectors[1][0], 'tags/Javascript');
        assert.equal(index.fieldVectors[1][1][1] > 1, true);
        done();
      });
  });

  it('should not index files without "lunar: true" metadata', function(done){
    var metalsmith = Metalsmith('test/fixtures/basic');
    metalsmith
      .use(lunr())
      .build(function(err, files){
        if (err) return done(err);
        index = JSON.parse(files['searchIndex.json'].contents);
        assert.equal(index.fieldVectors.length, 2);
        done();
      });
  });
});
