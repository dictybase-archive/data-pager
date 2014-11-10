# data-pager
A node.js module for paging through javascript array. It is very simple minded
and generic but primarilly intended to paginate through mock data in web api of
[flux](http://facebook.github.io/flux/) architecture.

# Install
```js
npm install dictybase/data-pager
```

# Usage
```js
var data = [
    { name: 'Tom johnson', email: 'tom@tom.com' },
    { name: 'Jack maniels', email: 'jack@man.com' },
    { name: 'Todd Gag', email: 'todd@hud.com' },
    { name: 'Ramon pastor', email: 'ramon@petite.com' },
    { name: 'Sabar remi', email: 'sabar@gon.com' },
    { name: 'Bator janas', email: 'bator@jor.com' },
    { name: 'Mike jenkinks', email: 'mike@jent.com' },
    { name: 'Kemra somar', email: 'kemra@joti.org' }
];

var Pager = require('datapager');
var pg = new Pager({data: data, pageSize: 2});
var p2 = pg.getDataByPage(3);
console.log(p2.get(0).email);
console.log(p2.get(1).email);
```

# Running unit tests
```js
npm test
```

