import url from 'url';
import path from 'path';
import fs from 'fs';
import Koa from 'koa';
import KoaRouter from 'koa-router';
import serve from 'koa-static';
import ejs from 'ejs';

const app = new Koa();
const router = new KoaRouter();
const here = url.fileURLToPath(import.meta.url);
const rootDir = path.dirname(here);
const viewDir = path.resolve(rootDir, 'views');
const fontDir = path.resolve(path.dirname(rootDir), 'fontmake', 'dist');

function parseNumber(text, fm) {
    const r = [];
    for (let i = 0; i < text.length; ++i) {
        let c = text.charAt(i);
        if (c == '.') {
            c = 'dot';
        }
        const v = parseInt(fm[c], 16);
        r.push(String.fromCharCode(v));
    }
    return r.join('');
}

const fontJsonNames = fs.readdirSync(fontDir).filter(p => p.endsWith('.json'));

router.get('/font.css', async ctx => {
    const r = [];
    for (const fjn of fontJsonNames) {
        const fn = fjn.substring(0, fjn.length - 5);
        r.push(fn);
    }
    const tc = fs.readFileSync(path.resolve(viewDir, 'font.css'), 'utf-8');
    ctx.type = 'text/css';
    ctx.body = ejs.render(tc, {fonts: r});
});

router.get('/', async ctx => {
    const text = '01234.56789';
    const r = [];
    for (const fjn of fontJsonNames) {
        const fjp = path.resolve(fontDir, fjn);
        const fm = JSON.parse(fs.readFileSync(fjp, 'utf-8'));
        const fn = fjn.substring(0, fjn.length - 5);
        const nts = `font-family: '${fn}';-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;`
        const nt = parseNumber(text, fm);
        r.push({
            text: nt,
            style: nts,
            cclass: fn,
        })
    }
    const tc = fs.readFileSync(path.resolve(viewDir, 'index.html'), 'utf-8');
    ctx.type = 'text/html';
    ctx.body = ejs.render(tc, {fonts: r});
});

app.use(serve(fontDir))
app.use(router.routes())
    .use(router.allowedMethods());


app.listen(30000);
