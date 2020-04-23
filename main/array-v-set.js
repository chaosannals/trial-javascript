import {
    timing,
    randomSet,
    arrayIntersect,
    arrayDiff,
    arraySegregate,
    arrayMerge,
} from './common.js';

const sa = randomSet(1000000, 1, 10000000);
const sb = randomSet(1000000, 1, 10000000);
const aa = Array.from(sa).sort((a, b) => a - b);
const ab = Array.from(sb).sort((a, b) => a - b);

let ai = timing('array intersect', () => {
    return arrayIntersect(aa, ab);
});
console.log(`array size: ${ai.length}`);

let si = timing('set intersect', () => {
    let result = new Set();
    sa.forEach(i => sb.has(i) && result.add(i));
    return result;
});
console.log(`set size: ${si.size}`);

let ad = timing('array diff', () => {
    return arrayDiff(aa, ab);
});
console.log(`array size: ${ad.length}`);

let sd = timing('set diff', () => {
    let result = Array.from(sa).filter(i => !sb.has(i));
    return new Set(result);
});
console.log(`set size: ${sd.size}`);

let am = timing('array merge', () => {
    return arrayMerge(aa, ab);
});
console.log(`array size: ${am.length}`);

let as = timing('array segregate', () => {
    return arraySegregate(aa, ab);
});
console.log(`array size: ${as.repeat.length} | ${as.unique.length}`);

let sm = timing('set merge', () => {
    let result = new Set(sa);
    sb.forEach(i => result.add(i));
    return result;
});
console.log(`set size: ${sm.size}`);
