var config = require('../config')();
var LimitRequestPromise = require('limit-request-promise');
var lp = new LimitRequestPromise(1,1);

var nowDate = new Date();
var today = nowDate.toLocaleDateString();
    nowDate.setDate(nowDate.getDate() - 7);
var oneWeekAgo =  nowDate.toLocaleDateString(); 
var base = "TWD=X";
console.log(today);

var param = [
    'select * from yahoo.finance.historicaldata where symbol = "' + base + '" and startDate = "' + oneWeekAgo + '" and endDate = "' + today + '"',
    'format=json',
    'env=store://datatables.org/alltableswithkeys'
].join('&');
var url = 'https://query.yahooapis.com/v1/public/yql?q='+ param;


lp.req(url).then(
        function(res){

            var obj = JSON.parse(res);
            var data = obj.query.results.quote;

            for(var key in data) {
               console.log(data[key].Date,data[key].Symbol,data[key].Close);
            }
        }
    ); // immediately


