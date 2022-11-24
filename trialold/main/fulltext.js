import lunr from 'lunr';

var idx = lunr(function () {
    this.field('title')
    this.field('body')

    this.add({
        "title": "Twelfth-Night",
        "body": "If music be the food of love, play on: Give me excess of it…",
        "author": "William Shakespeare",
        "id": "1"
    })
});

//搜索
let result = idx.search("love")
console.log(JSON.stringify(result));