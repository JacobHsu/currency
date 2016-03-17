var config = require('../config')();
var LimitRequestPromise = require('limit-request-promise');
var lp = new LimitRequestPromise(1,1);

var nowDate = new Date();
var today = nowDate.toISOString().slice(0,10).replace(/-/g,"");

lp.req('http://finance.yahoo.com/connection/currency-converter-cache?date='+today).then(
        function(data){
            var remove_end = data.indexOf("addConversionRates") +"addConversionRates".length;
            var str = data.substr(remove_end);
                str = str.substr(1); //remove'('
            var data_json= str.substring(0,str.length-3);//remove ');'
            var obj = JSON.parse(data_json);

            for(var key in obj.list.resources) {
               var resource = obj.list.resources[key].resource;
               console.log(resource.fields.symbol,resource.fields.price);
            }
        }
    ); // immediately


