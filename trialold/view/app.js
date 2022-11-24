import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';

const root = path.dirname(path.dirname(process.argv[1]));
const app = new Koa();
console.log(`http://localhost:3000`)
app.use(serve(path.resolve(root, 'browser')));
app.listen(3000);
