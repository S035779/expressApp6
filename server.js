var express = require('express');
var session = require('express-session');
var app = express();
 
//ルーティング設定
app.get('/sample-error', function(req, res, next) {
  try {
    //エラーをthrowする
    throw new Error("error occurred !!");
  } catch (e) {
    next(e);
  }
});

//エラーハンドリング用関数を設定
app.use(logHandler);
app.use(errorHandler);

//エラーログ出力よう関数
function logHandler(err, req, res, next) {
  console.error("[" + new Date + "] " + err.toString());
  next(err);
}

//エラーハンドリング用関数定義
function errorHandler(err, req, res, next) {
  res.status(500);
  res.send(err.message);
}

app.listen(3000);
console.log('Server running at http://localhost:3000/');
