# daqu.js
data query micro-library for in-memory tabular data

## Creating querys for tabular data

`daqu.js` is a small library for creating querys of in-memory tabular data on this form:

```javascript
//representation of tabular data with 2 cols and 4 rows

var datatable = [
  ['Joan', 'John', 'Eve', 'Jane'],  //col 0: name
  [39, 56, 43, 56]                  //col 1: age
];

```

```javascript
var result = daqu(datatable, ['name', 'age']).  //create daqu instance
  all().                                        //start with indexes for all rows
  sort([                                        //sort by 
    'age',  true, function(a, b){return a-b;},  //age, descending, with a 
                                                //custom compare function
    'name', 0,    0                             //then by name, ascending,
                                                //with the default compare function
  ]).
  slice(0, 2).                                  //keep only the two first indexes
  map(function(datatab, index, daquInstance){   //build array of names for each index
    return datatab[daquInstance.col.name][index];
  })[1];                                        //return the second item of this array
```
