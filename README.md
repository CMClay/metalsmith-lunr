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
tags: javascript lunr search
---

My article contents...
```

Use file metadata as `fields` for the search and assign weight for each field. The `content` field refers to the files actual content.

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

##Client Side Search

Metalsmith-lunr will generate searchIndex.json. Include [lunr.js](https://raw.githubusercontent.com/olivernn/lunr.js/master/lunr.min.js) in your javascript source files. Client side search example can be found [here](http://lunrjs.com/example/).

Once the JSON file has been parsed into javascript, simply run the following:
```js
index = lunr.Index.load(index)
var results = index.search("Your Search Here");
```

#### Optional Parameters

- `fields`: {<field>:<search weight>}
- `ref`: <index reference>
- `indexPath`: <path for JSON index file>
 

All of the files with a matching `collection` will be added to an array that is exposed as a key of the same name on the global Metalsmith `metadata`.

## CLI Usage

```json
{
  "plugins": {
    "metalsmith-lunr": {
      "fields": {
        "tags": 10,
        contents: 1
      }
    }
  }
}
```

## License

  MIT