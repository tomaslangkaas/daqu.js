# daqu.js
data query micro-library for in-memory tabular data

## What is this library for?

`daqu.js` is a small library for creating querys of in-memory tabular data on this form:

```javascript
//efficient representation of tabular data with 2 cols and 3 rows

var datatable = [
  ['Joan', 'John', 'Eve', 'Jane'],  //col 0: name
  [39, 56, 43, 56]                  //col 1: age
];

```

```javascript
var secondOldestOrderedByName = daqu(datatable, ['name', 'age']).
  all().
  sort([
    'age',  true, function(a, b){return a-b;},
    'name', 0,    0
  ]).
  slice(0, 2).
  map(function(datatab, index, daquInstance){
    return datatab[daquInstance.col.name][index];
  })[1];
```
