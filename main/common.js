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