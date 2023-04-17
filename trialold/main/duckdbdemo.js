// DuckDB 类似 SQLite 的数据库，比 SQLite 安装更方便，兼容性更好。

import duckdb from 'duckdb';
var db = new duckdb.Database(':memory:'); // or a file name for a persistent DB
db.all('SELECT 42 AS fortytwo', function(err, res) {
  if (err) {
    throw err;
  }
  console.log(res[0].fortytwo)
});