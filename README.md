# daqu.js
data query micro-library for in-memory data

```javascript
var datatable = [
  ['Joan', 'John', 'Diane', 'Jane'],  //col 0: name
  [43, 56, 39, 56]                    //col 1: age
];

//find all records which contain the substring 'an' in the name column,
//sort results by descending age:

var daquInstance = daqu(datatable, ['name', 'age'])
  .filter(function(datatable, rowIndex, daquInstance){
    return ('' + datatable[0][rowIndex]).indexOf('an') > -1;
  })
  .sort(['age', true, null]); //sort by age, descending, no custom comparison function

//dacuInstance.indexes now equals [3, 0, 2]
//map these results to a new array:

var result = daquInstance
  .map(function(datatable, rowIndex, daquInstance){
    return  datatable[0][rowIndex] + ', age' +
            datatable[1][rowIndex] + '\n';
  });

//result now equals
//["Jane, age 56", "Joan, age 43", "Diane, age 39"]
```
## daqu.js features

* Tiny (~1 kb, minified)
* Contains functions for filtering, multi-column sorting, mapping, reducing, slicing and more
* MIT-licensed
* ECMAScript 3 compliant code (works in IE6+ and all other ECMAScript 3 compliant runtimes)
* The library can easily be extended with custom functionality

## The `daqu` data format

The `daqu` library requires data on a specific form, where each data column is represented as an array, and all column arrays are contained in another array. Specific column arrays can be accessed as `data[columnIndex]` and specific values as `data[columnIndex][rowIndex]`. The length of the first column array indicates the total number of data rows.

```javascript
//representation of tabular data with 2 columns and 4 rows

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
