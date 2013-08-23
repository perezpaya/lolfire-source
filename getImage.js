var request = require('request');
var fs = require('fs');

// Champs thumb http://lkimg.zamimg.com/shared/riot/images/champions/'+ i +'_92.png'
// Item thumb http://qfcdn.5v5.me/item/3207.png
// profileIcon thumb

var i = 0;

var a = setInterval(function (){
	if(i >=200 ){
		clearInterval(a);
	} else{
		request('http://lkimg.zamimg.com/shared/riot/images/champions/'+ i +'_92.png').pipe(fs.createWriteStream(__dirname + '/static/champs/'+ i +'.png'));
		i++;
	}
}, 10);