var daqu=function(a){function b(b,g){var d,c={data:b,names:g||[],col:{},saved:{},indexes:[]};for(d in a)c[d]=a[d];for(d in g)c.col[g[d]]=d;return c}b.inherit=a;return b}({sort:function(a){function b(a,b){return a<b?-1:b<a?1:0}function h(a,c){return-b(a,c)}function g(a,b){return t(p[a],p[b])||m&&u(m[a],m[b])||n&&v(n[a],n[b])}function d(a,b){var c;for(e=0;!c&&e<r;e++)c=l[e](k[e][a],k[e][b]);return c}var c=this.data,f=this.col,p,m,n,t,u,v,k=[],l=[],r,e;for(e=0;e<a.length;e+=2)k.push(c[a[e]]||c[f[a[e]]]||0),l.push("function"==typeof a[e+1]?a[e+1]:a[e+1]?h:b);r=k.length;p=k[0];m=k[1];n=k[2];t=l[0];u=l[1];v=l[2];this.indexes.sort(3<r?d:g);return this},all:function(){return this.filter(function(){return 1})},filter:function(a,b){var h=[],g=this.indexes,d=this.data,c,f=0;if(b)for(c=g.length;f<c;f++)a(d,g[f],this)&&h.push(f);else for(c=d[0].length;f<c;f++)a(d,f,this)&&h.push(f);this.indexes=h;return this},slice:function(a,b){this.indexes=this.indexes.slice(a,b);return this},save:function(a){this.saved[a]=this.indexes.slice(0);return this},restore:function(a){var b=this.saved;b[a]&&(this.indexes=b[a].slice(0));return this},reduce:function(a,b,h){var g=this.data,d=this.indexes,c=0,f=d.length;if(h)for(;c<f;c++)b[c]=a(g,d[c],this,b);else for(;c<f;c++)b=a(g,d[c],this,b);return b},map:function(a){return this.reduce(a,[],1)}});
