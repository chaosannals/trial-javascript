export function timing(tag, callback) {
    let start = new Date().getTime();
    let result = callback();
    let end = new Date().getTime();
    let interval = ((end - start) / 1000).toFixed(10);
    console.log(`${tag}: ${interval}s`);
    return result;
}

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