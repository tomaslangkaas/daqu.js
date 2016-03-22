var daqu = (function(inheritance){
	function construct(data, colNames){
		var key, queryObject = {
			'data': data,
			'names': colNames ||[],
			'col': {},
			'saved': {},
			'indexes': []
		};
		for(key in inheritance){
			queryObject[key] = inheritance[key];
		}
		for(key in colNames){
			queryObject['col'][colNames[key]] = key;
		}
		return queryObject;
	}
	construct['inherit'] = inheritance;
	return construct;
})({
	'sort': function(parameters){
		function compareAscending(a, b){
			return a < b? -1: b < a? 1: 0;
		}
		function compareDescending(a, b){
			return -compareAscending(a, b);
		}
		function sort3Col(a, b){
			//check defined columns after priority,
			//return result of first compare function
			//that differs from 0,
			//otherwise, return last result
			return c1(v1[a], v1[b]) ||
			v2 && (c2(v2[a], v2[b])) ||
			v3 && (c3(v3[a], v3[b])) || 0;
		}
		function sortMultiCol(a, b){
			var result;
			for(i = 0; !result && i < l; i++){
				result = c[i](v[i][a], v[i][b]);
			}
			return result || 0;
		}
		var t = this, d = t['data'], col = t['col'],
			p = parameters,
			v1, v2, v3,
			c1, c2, c3,
			v = [],
			c = [],
			l, i;
		//fill array `v` with data columns in sort order
		//fill array `c` with corresponding comparison functions
		for(i = 0; i < p.length; i+= 2){
			v.push(d[p[i]] || d[col[p[i]]] || 0);
			c.push(typeof(p[i + 1]) == 'function'?
				p[i + 1]:
				p[i + 1]? 
					compareDescending: 
					compareAscending
			);
		}
		l = v.length;
		v1 = v[0];
		v2 = v[1];
		v3 = v[2];
		c1 = c[0];
		c2 = c[1];
		c3 = c[2];
		//sort indexes with the fast comparison function (for less than 4 columns),
		//or the general comparison function
		t['indexes'].sort(l > 3? sortMultiCol :sort3Col);
		return t;
	},
	'all':function(){
		return this['filter'](function(){return 1});
	},
	'filter': function(filterFunction, useExisting){
			var t = this, results = [],
			indexes = t['indexes'],
			data = t['data'],
			len, i = 0;
			if(!useExisting){
				for(len = data[0].length; i < len; i++)
					if(filterFunction(data, i, t)) results.push(i);
			}else{
				for(len = indexes.length; i < len; i++)
					if(filterFunction(data, indexes[i], t)) results.push(i);
			}
			t['indexes'] = results;
			return t;
		},
	'slice': function(a, b){
		var t = this;
		t['indexes'] = t['indexes'].slice(a, b);
		return t;
	},
	'save': function(name){
		var t = this;
		t['saved'][name] = t['indexes'].slice(0);
		return t;
	},
	'restore': function(name){
		var t = this, s = t['saved'];
		if(s[name]){
			t['indexes'] = s[name].slice(0);
		}
		return t;
	},
	'reduce': function(reducer, value, isMap){
		var undef, t = this, data = t['data'], indexes = t['indexes'], i = 0, l = indexes.length;
		if(value == undef) value = '';
		if(!isMap){
			for(;i < l; i++){
				value = reducer(data, indexes[i], t, value);
			}
		}else{
			for(;i < l; i++){
				value[i] = reducer(data, indexes[i], t, value);
			}
		}
		return value;
	},
	'map': function(mapper){
		return this['reduce'](mapper, [], 1);
	}
});
