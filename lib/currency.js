var YAHOO_API_URL = 'https://query.yahooapis.com/v1/public/yql';
var SUPPORT_CURRENCY = ['USD','EUR','JPY','TWD','CNY'];
var OPT_TIMEOUT_SEC = 30;

var LimitRequestPromise = require('limit-request-promise');
var lp = new LimitRequestPromise(1,1);

exports.getSupportPair = function(base){
    return SUPPORT_CURRENCY.
        filter(function(v){ return v !== base }).
        map(function(v){return v + base});
}

exports.rate = function(aPairs){
    return ticker(aPairs).
        reduce(function(r, v){
            r[v['id']] = parseFloat(v['Rate']);
            return r;
        }, {});
        
}

var ticker = function(pairs){
    if(!(pairs instanceof Array)) pairs = [pairs];
    return query(pairs).then(function(v){
        if(v.query['count'] !== pairs.length) throw new Error('query error');
        else return (v.query.results.rate instanceof Array) ? v.query.results.rate : [v.query.results.rate];
    });
}

var query = function(aPairs){
    var w = aPairs.map(function(v){return '"' + v + '"'}).join(',');
    var param = [
        'select * from yahoo.finance.xchange where pair in (' + w + ')',
        'format=json',
        'env=store://datatables.org/alltableswithkeys'
    ].join('&');
    return req(YAHOO_API_URL + '?q=' + param).then(JSON.parse)
}

var req = function(url){
    return lp.req(createGetOption(url))
}

var createGetOption = function(url){
    return {
        url : url,
        timeout : Math.floor(OPT_TIMEOUT_SEC * 1000),
    }
}



var calcRate = function(keycurrency, target, rates){
    var reverse = calcReverseRate(rates[target + keycurrency]);
    var r = Object.keys(rates).
        map(function(v){return v.split(keycurrency).shift()}).
        filter(function(v){return v !== target}).
        reduce(function(r, v){
            r[v + target] = reverse * rates[v + keycurrency];
            return r;
        }, {})
    r[keycurrency + target] = reverse;
    return r;
}

var calcReverseRate = exports.calcReverseRate = function(rate){
    return 1 / rate;
}

var fullRate = exports.fullRate = function(){
    var keycurrency = 'USD';
    return rate(getSupportPair(keycurrency)).then(function(rates){
        getSupportCurrency().
            filter(function(v){return v !== keycurrency}).
            map(function(v){
                return calcRate(keycurrency, v, rates);
            }).forEach(function(v){
                Object.keys(v).forEach(function(k){rates[k]=v[k]});
            });
        return rates;
    })
}