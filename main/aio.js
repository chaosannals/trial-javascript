async function test(valid, sign) {
    return new Promise((resolve, reject) => {
        // Promise 里面如果不调用 resolve 或 reject 那么 finally 也不会执行。
        if (valid) {
            console.log('yes', sign);
            resolve();
        } else {
            reject(sign);
        }
    });
}

async function main() {
    try {
        console.log('start');
        await test(true, '0');
        await test(false, '1');
        await test(true, '2');
    } catch (e) {
        console.log(e);
    } finally {
        console.log('finally');
    }
}

main();