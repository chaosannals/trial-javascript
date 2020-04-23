/**
 * 用时
 * 
 * @param {*} tag 
 * @param {*} callback 
 */
export function timing(tag, callback) {
    let start = new Date().getTime();
    let result = callback();
    let end = new Date().getTime();
    let interval = ((end - start) / 1000).toFixed(10);
    console.log(`${tag}: ${interval}s`);
    return result;
}

/**
 * 随机 ID
 * 
 * @param {*} length 
 */
export function randomId(length) {
    let result = [];
    for (let i = 0; i < length; ++i) {
        let v = Math.floor(Math.random() * 16);
        result.push(v.toString(16));
    }
    return result.join();
}

/**
 * 随机集合。
 * 
 * @param {*} length 
 * @param {*} min 
 * @param {*} max 
 */
export function randomSet(length, min, max) {
    let result = new Set();
    while (result.size < length) {
        while (true) {
            let n = min + Math.floor(Math.random() * max);
            if (!result.has(n)) {
                result.add(n);
                break;
            }
        }
    }
    return result;
}

/**
 * 有序数组交集
 * 
 * @param {*} a 
 * @param {*} b 
 */
export function arrayIntersect(a, b) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < a.length && j < b.length) {
        if (a[i] < b[j]) {
            ++i;
        } else if (a[i] > b[j]) {
            ++j;
        } else {
            result.push(a[i]);
            ++i;
            ++j;
        }
    }
    return result;
}

/**
 * 有序数组取差
 * 
 * @param {*} a 
 * @param {*} b 
 */
export function arrayDiff(a, b) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < a.length && j < b.length) {
        if (a[i] < b[j]) {
            result.push(a[i++]);
        } else if (a[i] > b[j]) {
            ++j;
        } else {
            ++i;
            ++j;
        }
    }
    while (i < a.length) {
        result.push(a[i++]);
    }
    return result;
}

/**
 * 分离出重复和唯一项。
 * 
 * @param {*} a 
 * @param {*} b 
 */
export function arraySegregate(a, b) {
    let unique = [];
    let repeat = [];
    let i = 0;
    let j = 0;
    while (i < a.length && j < b.length) {
        if (a[i] < b[j]) {
            unique.push(a[i]);
            ++i;
        } else if (a[i] > b[j]) {
            ++j;
        } else {
            repeat.push(a[i]);
            ++i;
            ++j;
        }
    }
    while (i < a.length) {
        unique.push(a[i++]);
    }
    return {
        unique: unique,
        repeat: repeat,
    }
}

/**
 * 有序数组并集
 * 
 * @param {*} a 
 * @param {*} b 
 */
export function arrayMerge(a, b) {
    let result = [];
    let i = 0;
    let j = 0;
    while (true) {
        if (i >= a.length) {
            while (j < b.length) {
                result.push(b[j++]);
            }
            return result;
        }
        if (j >= b.length) {
            while (i < a.length) {
                result.push(a[i++]);
            }
            return result;
        }
        if (a[i] < b[j]) {
            result.push(a[i++]);
        } else if (a[i] > b[j]) {
            result.push(b[j++]);
        } else {
            result.push(a[i]);
            ++i;
            ++j;
        }
    }
}