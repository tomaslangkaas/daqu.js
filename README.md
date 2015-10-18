# daqu.js
data query micro-library for in-memory data

```javascript
//representation of tabular data with 2 columns and 4 rows

var datatable = [
  ['Joan', 'John', 'Diane', 'Jane'],  //col 0: name
  [43, 56, 39, 56]                    //col 1: age
];

//find all records which contain the substring 'an' in the name column
var daquInstance = daqu(datatable, ['name', 'age'])
  .filter(function(datatable, rowIndex, daquInstance){
    return ('' + datatable[0][rowIndex]).indexOf('an') > -1;
  });

//dacuInstance.indexes now equals [0, 2, 3]

//sort the results by descending age and build a string to show the results

var output = daquInstance
  .sort(['age', true, null]) //sort by age, descending, no custom comparison function
  .reduce(function(value, datatable, rowIndex, daquInstance){
    return value + datatable[0][rowIndex] + 
      ', age' + datatable[1][rowIndex] + '\n';
  }, ''); //initial value is empty string

//inspecting output in a console yields:
//> output
//Jane, age 56
//Joan, age 43
//Diane, age 39
```

## Data format

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
