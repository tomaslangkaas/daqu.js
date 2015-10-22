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
  .filter(function(datatable, rowIndex){
    return ('' + datatable[0][rowIndex]).indexOf('an') > -1;
  })
  .sort(['age', true]); //sort by age, descending

//dacuInstance.indexes now equals [3, 0, 2]
//map these results to a new array:

var result = daquInstance
  .map(function(datatable, rowIndex){
    return  datatable[0][rowIndex] + ', age' +
            datatable[1][rowIndex];
  });

//result now equals
//["Jane, age 56", "Joan, age 43", "Diane, age 39"]
```
## daqu.js features

* Tiny (~1.3 kb, minified)
* Fast (only manipulates arrays of integer indexes)
* Contains functions for filtering, multi-column sorting, mapping, reducing, slicing and more
* MIT-licensed
* ECMAScript 3 compliant (works in IE6+ and all other ECMAScript 3 compliant runtimes)
* Easily extended with custom functionality
 
## API

### The `daqu` data format

The `daqu` library requires data on a specific form, where each data column is represented as an array, and all column arrays are contained in another array. Specific column arrays can be accessed as `data[columnIndex]` and specific values as `data[columnIndex][rowIndex]`. The length of the first column array indicates the total number of data rows.

```javascript
//representation of tabular data with 2 columns and 4 rows

var datatable = [
  ['Joan', 'John', 'Diane', 'Jane'],  //col 0: name
  [43, 56, 39, 56]                    //col 1: age
];

```

### Creating a `daqu` instance

New data query instances are created with the `daqu(data [, columnNames])` function.

```javascript
var daquInstance = daqu(datatable);

// OR with an optional array of column names:

var daquInstance = daqu(datatable, ['name', 'age']);
```

### Query instance properties

#### `daquInstance.data`

Reference to the datatable provided at instance creation.

#### `daquInstance.indexes`

Array with integer indexes representing the current query result. By default this array is empty. Fill this array with `daquInstance.all()` or `daquInstance.filter()`.

#### `daquInstance.names`

Array with column names provided at instance creation.

#### `daquInstance.col`

Object with column indexes corresponding to column names provided at instance creating. Facilitates column lookup by name instead of index.

```javascript
var daquInstance = daqu(datatable, ['name', 'age']);

//column lookup by integer:

var ageColumn = datatable[0];

//column lookup by name:

var ageColumn = datatable[daquInstance.col.age];
```

#### `daquInstance.saved`

Object containing saved query results. Used by the `daquInstance.save()` and `daquInstance.restore()` methods.

### Query instance methods

#### `daquInstance.all()`

Fills the `daquInstance.indexes` array with all available rowIndexes. Returns the `daquInstance` to allow chaining.

#### `daquInstance.filter(filterFunction [, useExistingBoolean])`

Applies the filterFunction to all rows, and fills the `daquInstance.indexes` array with all rows where the filterFunction returns a truthy value. Returns the `daquInstance` to allow chaining.

The filterFunction is provided with three arguments: `daquInstance.data`, the current `rowIndex` and the `daquInstance`.

If the `useExistingBoolean` argument is set to a truthy value, the filterFunction filters the existing query indexes, otherwise it filters all rows.

#### `daquInstance.sort(parameterArray)`

Applies multi-column sorting to the current query results. Returns the `daquInstance` to allow chaining.

The `parameterArray`

```javascript

['age'] //sort by age, ascending
['age', false] //sort by age, ascending
['age', true] //sort by age, descending
['age', function(a, b){return a-b}] //sort by age, custom comparison function

['age', true,
'name', false]

```

#### `daquInstance.slice(startIndex, stopIndex + 1)`

#### `daquInstance.map(mapFunction)`

#### `daquInstance.reduce(reduceFunction [,startValue])`

#### `daquInstance.save(name)`

Saves a copy of the current query results. Returns the `daquInstance` to allow chaining. Useful when performing various subqueries from the same query result.

#### `daquInstance.restore(name)`

Replaces the current query results with a copy of the query results saved under `name`. Returns the `daquInstance` to allow chaining. 

### Extending `daqu`

The `daqu.inherit` property contains all class methods and can be extended by new methods
