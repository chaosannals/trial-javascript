function basename(path, bare) {
  let group = path.split(/[\\\/]/).filter((i) => i.length > 0);
  let name = group[group.length - 1];
  if (bare) {
    let i = name.lastIndexOf(".");
    return i > 0 ? name.substring(0, i) : name;
  }
  return name;
}

function suffix(path) {
  let i = path.lastIndexOf(".");
  return i > 0 ? path.substring(i + 1) : "";
}

let a = 'aaaa/bbbb\/\\cccc\\\\dddd.jpg';
let b = 'aaaa/bbbbbbbb///\\/\/ddd2.jpg';

console.log(suffix(a));
console.log(basename(b), basename(b, true));
