/**
 * [本地启动静态服务器]
 * @type {[type]}
 */
var http = require('http');
var express = require('express');
var app = express();
app.use("/public", express.static(__dirname + '/public'));

// 创建服务端
http.createServer(app).listen('3010',function() {
	   console.log('服务器已启动');
});
