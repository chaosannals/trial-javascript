import { timing, randomSet } from './common.js';

let sa = randomSet(1000000, 1, 10000000);
let sb = randomSet(1000000, 1, 10000000);
let aa = Array.from(sa).sort();
let ab = Array.from(sb).sort();

let ai = timing('array intersect', () => {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < aa.length && j < ab.length) {
        if (aa[i] < ab[j]) {
            ++i;
        } else if (aa[i] > ab[j]) {
            ++j;
        } else {
            result.push(aa[i]);
            ++i;
            ++j;
        }
    }
    return result;
});
console.log(`array size: ${ai.length}`);

let si = timing('set intersect', () => {
    let result = Array.from(sa).filter(i => sb.has(i));
    return new Set(result);
});
console.log(`set size: ${si.size}`);

let ad = timing('array diff', () => {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < aa.length && j < ab.length) {
        if (aa[i] < ab[j]) {
            result.push(aa[i++]);
        } else if(aa[i] > ab[j]) {
            ++j;
        } else {
            ++i;
            ++j;
        }
    }
    while (i < aa.length) {
        result.push(aa[i++]);
    }
    return result;
});
console.log(`array size: ${ad.length}`);

let sd = timing('set diff', () => {
    let result = Array.from(sa).filter(i => !sb.has(i));
    return new Set(result);
});
console.log(`set size: ${sd.size}`);

let am = timing('array merge', () => {
    let result = [];
    let i = 0;
    let j = 0;
    while (true) {
        if (i >= aa.length) {
            while (j < ab.length) {
                result.push(ab[j++]);
            }
            return result;
        }
        if (j >= ab.length) {
            while (i < aa.length) {
                result.push(aa[i++]);
            }
            return result;
        }
        if (aa[i] < ab[j]) {
            result.push(aa[i++]);
        } else if (aa[i] > ab[j]) {
            result.push(ab[j++]);
        } else {
            result.push(aa[i++]);
            ++j;
        }
    }
});
console.log(`array size: ${am.length}`);

let sm = timing('set merge', () => {
    let result = new Set(sa);
    sb.forEach(i => result.add(i));
    return result;
});
console.log(`set size: ${sm.size}`);
