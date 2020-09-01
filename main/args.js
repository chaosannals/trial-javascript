import url from 'url';

console.log(process.argv);
process.argv.forEach(p => {
    let u = url.pathToFileURL(p);
    console.log(u);
});