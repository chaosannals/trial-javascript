import fs from 'fs';
import initSqlJs from 'sql.js';

initSqlJs().then(SQL => {
    let db = new SQL.Database();
    db.run("CREATE TABLE test(col1, col2);");
    let data = db.export();
    let buffer = Buffer.from(data);
    fs.writeFileSync("test.db", buffer);
})

initSqlJs().then(SQL => {
    let filebuffer = fs.readFileSync('test.db');
    let db = new SQL.Database(filebuffer);
});

