# metalsmith-lunr

A [Metalsmith](https://github.com/segmentio/metalsmith) plugin that integrates the [Lunr.js](http://lunrjs.com/) client side search engine.

Builds a searchable JSON index based on Metalsmith metadata.

## Installation

    $ npm install metalsmith-lunr

## Usage

Include `lunr: true` in file metadata to include it in the search index.

```
---
lunr: true
title: My Article
tags: maybe some tags for indexing
---

My article contents...
```

Metalsmith-lunr can be used without options:
```js
var lunr = require('metalsmith-lunr');

metalsmith.use(lunr()).
```

Use file metadata as `fields` for the search and assign weight for each field. The `content` field refers Metalsmith's internal record of the files contents and should not be included in the file metadata.

```js
var lunr = require('metalsmith-lunr');
var lunr_ = require('lunr');
require('lunr-languages/lunr.stemmer.support')(lunr_);
require('lunr-languages/lunr.no')(lunr_);

metalsmith.use(lunr({
  ref: 'title',
  indexPath: 'index.json',
  fields: {
      contents: 1,
      tags: 10
  },
  pipelineFunctions: [
    lunr_.trimmer,
    lunr_.no.stopWordFilter,
    lunr_.no.stemmer
  ],
  preprocess: function(content) {
    // Replace all occurrences of __title__ with the current file's title metadata.
    return content.replace(/__title__/g, this.title);
  }
}));
```

#### Optional Parameters

- `fields`: {`metadata search field`: `search weight`}
- `ref`: `metadata search reference for document`
- `indexPath`: `path for JSON index file`
- `pipelineFunctions`: [`lunr pipeline functions`] Functions will be called in order by lunr, see [lunr doc](http://lunrjs.com/docs/#Pipeline) for more information.
- `preprocess`: a callback function that can pre-process the content of each file before it is indexed. (For example stripping HTML tags). This will not affect the content of the files themselves. The callback is passed the content as a string to it's first argument. The metadata (including the raw content buffer) can be access with `this`. The callback **must return** a string.

#### Default Parameter Values

  - `fields`: {`contents`: `1`}
  - `ref`: `filePath`
  - `indexPath`: `searchIndex.json`

 
##Client Side Search

Metalsmith-lunr will generate searchIndex.json. Include [lunr.js](https://raw.githubusercontent.com/olivernn/lunr.js/master/lunr.min.js) in your javascript source files. Client side search example can be found [here](http://lunrjs.com/example/).

Once the JSON file has been parsed into javascript, simply run the following:
```js
//index is the parsed JSON file
idx = lunr.Index.load(index)
var results = idx.search("Your Search Terms Here");
```

## CLI Usage

```json
{
  "plugins": {
    "metalsmith-lunr": {
      "fields": {
        "tags": 10,
        "contents": 1
      }
    }
  }
}
```
## Tests

`npm test`

## License

  MIT
