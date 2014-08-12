# metalsmith-lunr

A [Metalsmith](https://github.com/segmentio/metalsmith) plugin that integrates the [Lunr.js](http://lunrjs.com/) client side search engine.

Builds a searchable JSON index based on Metalsmith metadata.

## Installation

    $ npm install metalsmith-lunr

## Usage

Include `lunr: true` in file metadata to include it in the search index.

```markdown
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

metalsmith.use(lunr({
  ref: 'title',
  indexPath: 'index.json',
  fields: {
      contents: 1,
      tags: 10
  }
}));
```

#### Optional Parameters

- `fields`: {`metadata search field`: `search weight`}
- `ref`: `metadata search reference for document`
- `indexPath`: `path for JSON index file`

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