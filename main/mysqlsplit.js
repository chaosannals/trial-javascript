import fs from "fs";

let sqls = fs.readFileSync("./asset/mysql.sql").toString("utf-8");
let inString = false;
let stringTag = null;
let start = 0;
let result = [];

for (let i = 0; i < sqls.length; ++i) {
  let c = sqls[i];
  // 字符模式切换
  if (c == "'" || c == '"') {
    if (inString && stringTag == c) {
      if (c + 1 < sqls.length) {
        let nc = sqls[c + 1];
        if (stringTag == nc) {
          ++i;
          continue;
        }
      }
      inString = false;
      stringTag = null;
    } else if (stringTag == null) {
      inString = true;
      stringTag = c;
    } else {
      inString = true;
    }
  }
  // 断句
  if (!inString && c == ";") {
    result.push(sqls.substring(start, i));
    start = i + 1;
  }
}
result.push(sqls.substring(start));

result = result.map(i => i.trim()).filter(i => i.length > 0);

console.log('sql count:', result.length);
for (let j = 0; j < result.length; ++j) {
  console.log(j, result[j]);
}
