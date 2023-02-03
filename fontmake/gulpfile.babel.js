import gulp from 'gulp';
import iconfont from 'gulp-iconfont';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { shuffle } from 'lodash'

const here = process.cwd();
const distDir = path.resolve(here, 'dist');
const runTimestamp = Math.round(Date.now() / 1000);

function globSvg() {
    const svgDir = path.resolve(here, 'svgs');
    const ps = fs.readdirSync(svgDir);
    return shuffle(ps.map(n => path.resolve(svgDir, n)));
}

const svgs = globSvg();

export function makefont() {
    const start = 0xE000 + Math.floor(Math.random() * (0x18FF - svgs.length - 1));
    const filename = randomUUID();
    return gulp.src(svgs)
        .pipe(iconfont({
            fontName: filename,
            startUnicode: start,
            // prependUnicode: true, // 这个会导致修改svg 文件名，很坑。
            formats: ['ttf', 'eot', 'woff'],
            timestamp: runTimestamp,
        }))
        .on('glyphs', function (glyphs, options) {
            const ansfn = path.resolve(distDir, `${filename}.json`);
            const rm = {};
            for (let g of glyphs) {
                const code = g.unicode[0].charCodeAt(0).toString(16);
                console.log(g.name, code);
                rm[g.name] = code;
            }
            fs.writeFileSync(ansfn, JSON.stringify(rm));
            console.log(options);
        })
        .pipe(gulp.dest(distDir));

}

const build = gulp.series(makefont);

export default build;
