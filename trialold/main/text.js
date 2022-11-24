function randomText(length) {
  let result = [];
  let set = "1234567890qwertyuiopasdfghjklzxcvbnm";
  for (let i = 0; i < length; ++i) {
    let index = Math.floor(Math.random() * set.length);
    result.push(set[index]);
  }
  return result.join("");
}

let a = randomText(12);
console.log('text: ', a);