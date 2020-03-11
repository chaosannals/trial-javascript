import url from 'url';
import path from 'path';

if (process.argv.length > 2) {
    let here = url.fileURLToPath(import.meta.url);
    let folder = path.dirname(here);
    let param = process.argv.slice(2);
    let file = path.resolve(folder, param[0]);
    let link = url.pathToFileURL(file);
    import(link);
}