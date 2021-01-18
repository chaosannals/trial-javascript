let a = {
    aaa: {}
};

let p = new Proxy(a, {
    get(target, key) {
        return target[key];
    }
});


p.aaa.bbbb = 111;
p.ccc = 222;

console.log(p, a);


let b = [];

let p2 = new Proxy(b, {
    get(target, key) {
        return target[key];
    }
})

p2[0] = { z: 1, x: 2};
console.log(p2, b);

p2[2] = 33;
p2[0].z = 333;

console.log(p2, b);
