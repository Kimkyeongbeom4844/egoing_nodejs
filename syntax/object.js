const { name } = require("ejs");

var book = {
	name : 'JSbook',
	author : 'egoing',
	student : 'kkb'
}
console.log(book.student);
console.log(book['student']);

for(var info in book) {
	console.log('프로퍼티 => ',info,'& value => ',book[info]);
}