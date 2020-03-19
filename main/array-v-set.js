import { timing, randomSet } from './common.js';

let sa = randomSet(100000, 1, 10000000);
let sb = randomSet(100000, 1, 10000000);
let aa = Array.from(sa);
let ab = Array.from(sb);

timing('array intersect', () => {
    return aa.filter(i => ab.indexOf(i) >= 0);
});

timing('set intersect', () => {
    return Array.from(sa).filter(i => sb.has(i));
});

timing('array diff', () => {
    return aa.filter(i => ab.indexOf(i) < 0);
});

timing('set diff', () => {
    return Array.from(sa).filter(i => !sb.has(i));
});