import { timing, randomSet } from './common.js';

let sa = randomSet(1000000, 1, 10000000);
let sb = randomSet(1000000, 1, 10000000);
let aa = Array.from(sa).sort();
let ab = Array.from(sb).sort();

timing('array intersect', () => {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < aa.length && j < ab.length) {
        if (aa[i] < ab[i]) {
            ++i;
        } else if (aa[i] > ab[i]) {
            ++j;
        } else {
            result.push(aa[i]);
            ++i;
            ++j;
        }
    }
    return result;
});

timing('set intersect', () => {
    let result = Array.from(sa).filter(i => sb.has(i));
    return new Set(result);
});

timing('array diff', () => {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < aa.length && j < ab.length) {
        if (aa[i] < ab[j]) {
            result.push(aa[i++]);
        } else if(aa[i] > ab[i]) {
            ++j;
        } else {
            ++i;
            ++j;
        }
    }
    while (i < aa.length) {
        result.push(aa[++i]);
    }
    return result;
});

timing('set diff', () => {
    let result = Array.from(sa).filter(i => !sb.has(i));
    return new Set(result);
});

timing('array merge', () => {
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

timing('set merge', () => {
    let result = Array.from(sa).filter(i => !sb.has(i));
    sb.forEach(i => result.push(i));
    return new Set(result);
});
