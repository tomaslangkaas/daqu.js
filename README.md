# daqu.js
data query micro-library for in-memory tabular data

## What is this library for?

`daqu.js` is a small library for creating querys of in-memory tabular data on this form:

```javascript
//representation of tabular data with 2 cols and 4 rows

var datatable = [
  ['Joan', 'John', 'Eve', 'Jane'],  //col 0: name
  [39, 56, 43, 56]                  //col 1: age
];

```

```javascript
var secondOrderedByAgeAndName = daqu(datatable, ['name', 'age']). //create daqu instance
  all(). //start with indexes for all rows
  sort([
    //sort by age, descending, with a custom compare function
    'age',  true, function(a, b){return a-b;},
    //then by name, ascending, with the default compare function
    'name', 0,    0
  ]).
  slice(0, 2). //keep only the two first indexes after sorting
  map(function(datatab, index, daquInstance){
    //build an array with the name corresponding to each index
    return datatab[daquInstance.col.name][index];
  })[1];//return the second item of this array
```
