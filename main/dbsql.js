import fs from 'fs';
import initSqlJs from 'sql.js';

function createDb(SQL) {
    let db = new SQL.Database();
    db.run("CREATE TABLE test(col1, col2);");
    let data = db.export();
    let buffer = Buffer.from(data);
    fs.writeFileSync("test.db", buffer);
}

initSqlJs().then(SQL => {
    if (!fs.existsSync("test.db")) {
        createDb(SQL);
    }
    let filebuffer = fs.readFileSync('test.db');
    let db = new SQL.Database(filebuffer);
});

