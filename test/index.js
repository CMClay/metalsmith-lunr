var assert = require('assert');
var Metalsmith = require('metalsmith');
var lunr = require('..');

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
        assert.equal(index.ref, 'filePath');
        assert.equal(index.fields[0].name, 'contents');
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
        assert.equal(index.ref, 'title');
        assert.equal(index.fields.length, 3);
        assert.equal(index.fields[0].name, 'title');
        assert.equal(index.fields[1].name, 'tags');
        assert.equal(index.fields[0].boost, 10);
        assert.equal(index.fields[1].boost, 100);
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
        assert.equal(index.documentStore.length, 2);
        done();
      });
  });
});
