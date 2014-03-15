var parser = require('../');
var test = require('tap').test;
var fs = require('fs');

var files = {
    main: __dirname + '/files/main.js',
    foo: __dirname + '/files/foo.js',
    bar: __dirname + '/files/bar.js'
};

var sources = Object.keys(files).reduce(function (acc, file) {
    acc[file] = fs.readFileSync(files[file], 'utf8');
    return acc;
}, {});

test('deps', function (t) {
    t.plan(1);
    var p = parser(files.main);
    var rows = [];
    
    p.on('data', function (row) { rows.push(row) });
    p.on('end', function () {
        t.same(rows, [
            {
                id: files.main,
                source: sources.main,
                entry: true,
                deps: { './foo': files.foo }
            },
            {
                id: files.foo,
                source: sources.foo,
                deps: { './bar': files.bar }
            },
            {
                id: files.bar,
                source: sources.bar,
                deps: {}
            }
        ]);
    });
});
