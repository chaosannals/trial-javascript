function hexToArray(text) {
  let result = [];
  let length = text.length - 1;
  for (let i = 0; i < length; i += 2) {
    let v = parseInt(text.substr(i, 2), 16);
    result.push(v);
  }
  return new Uint8Array(result);
}
let a = hexToArray(
  "15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225",
);
console.log(a.length, a);