function Quicktest(b,d,g){var e,f,a,c=b+"\n"+Array(b.length+1)
.join("=")+"\n";for(a=b=e=f=0;a<d.length;a+=2)b++,d[a]===d[a+1]?e++:
(f++,c+="\n- Fail (test "+b+"): Expected "+d[a+1]+", but got "+d[a]);
c+="\nOf "+b+" tests, "+e+" passed and "+f+" failed.";g?g(c):console&&
console.log&&console.log(c);return e==b};

(function(){

var testdata = [
/* id */		['J',     'E',     'H',     'N'    ],
/* name */		['John',  'Edith', 'Henry', 'Norah'],
/* age */		[ 32,      56,     48,      29     ],
/* gender */	[ 'm',     'f',    'm',     'f'    ],
/* fav col */	[ 'purple','blue', 'purple','green']
];

function reducer(d, i, t, v){
	return v + d[0][i];
}

daqu.inherit.find = function(col, str){
	return this.filter(function(d, i, q){
		return d[col][i].indexOf(str) > -1;
	});
};

var inst = daqu(testdata, ['id','name','age','gender','favcol']);

var t = Quicktest(
	'daqu.js',[

		//1: all()
		''+inst.save('none').all().save('all').indexes, '0,1,2,3',

		//2: restore
		''+inst.restore('none').indexes, '',

		//3: restore and reduce
		inst.restore('all').reduce(reducer, ''), 'JEHN',  

		//4: filter
		inst.restore('none')
			.filter(function(d, i, t){
				return d[t.col.age][i] > 30;})
			.reduce(reducer, ''),
		'JEH',

		//5: sort by favcol stable
		inst.restore('all')
			.sort(['favcol'])
			.reduce(reducer, ''), 'ENJH',

		//6: sort by favcol descending stable
		inst.restore('all')
			.sort(['favcol', true])
			.reduce(reducer, ''), 'JHNE',

		//7: sort by favcol, gender and age
		inst.restore('all')
			.sort([
				'favcol', 0, 
				'gender', 0, 
				'age', 1])
			.reduce(reducer, ''), 'ENHJ',

		//8: sort by favcol, gender, name(ignore) and age
		inst.restore('all')
			.sort([
				'favcol', 0, 
				'gender', 0,
				'name', function(){return 0;},
				'age'])
			.reduce(reducer, ''), 'ENJH',

		//9: custom comparison
		inst.restore('all')
			.sort([
				'age',
				function(a,b){return b-a}
			])
			.reduce(reducer, ''), 'EHJN',
			
		//10: deep sort
		''+daqu([
			[2,2],
			[2,2],
			[2,2],
			[2,2],
			[2,2],
			[2,2],
			[2,2],
			[2,1]
		]).all()
			.sort([0,0,1,0,2,0,3,0,4,0,5,0,6,0,7,0])
			.indexes, '1,0',
			
		//11: filter twice
		''+inst.restore('none')
			.filter(function(d, i, q){
				return d[q.col.gender][i] == 'f';
			})
			.filter(function(d, i, q){
				return d[q.col.age][i] > 30;
			}, true)
			.indexes, '0',
			
		//12: slice
		''+inst.restore('all')
			.slice(1,3)
			.indexes, '1,2',
		
		//13: map
		inst.restore('all')
			.map(function(d, i, q){
				return d[q.col.name][i] +
				': ' + d[q.col.age][i]; 
			}).join(', '), 'John: 32, Edith: 56, Henry: 48, Norah: 29',
		
		//14: extend
		''+inst.find(inst.col.gender, 'f')
			.indexes, '1,3'
		
	],
	function(r){testresults.innerHTML = '<pre><code>'+r+'</code></pre>';}
);

})();
