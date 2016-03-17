# nodejs

`npm init`  
`npm install express --save`  
`npm i limit-request-promise --save`  

# heroku

https://dashboard.heroku.com/apps
cteate new project `jacobhsu-currency` 

.git config  add
```
[remote "heroku"]
    url = https://git.heroku.com/jacobhsu-currency.git
    fetch = +refs/heads/*:refs/remotes/heroku/*
```

Procfile
```
web: node index.js
```

index.js
```
app.listen(process.env.PORT || 5000);
```


Deploy using Heroku Git  

Install the Heroku Toolbelt  
```
$ heroku login
$ git push heroku master
```

http://jacobhsu-currency.herokuapp.com/ 


Reference 
---------

https://github.com/you21979/node-yahoo-currency  
https://github.com/pilwon/node-yahoo-finance  

https://developer.yahoo.com/yql/console  

[YQL yahoo.finance.xchange historical data](http://stackoverflow.com/questions/31606027/yql-yahoo-finance-xchange-historical-data)  

Syntax
---------
http://finance.yahoo.com/connection/currency-converter-cache?date=20160311  


Array.prototype.filter()  
Array.prototype.map()  
`fx.rate([ 'USDTWD', 'EURTWD', 'JPYTWD', 'CNYTWD' ])`  

Array.prototype.map()  
Array.prototype.join()  

"USDTWD","EURTWD","JPYTWD","CNYTWD"  

```
https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("USDTWD","EURTWD","JPYTWD","CNYTWD")&format=json&env=store://datatables.org/alltableswithkeys
```


```
{
  "query": {
    "count": 4,
    "created": "",
    "lang": "zh-TW",
    "results": {
      "rate": [
        {
          "id": "USDTWD",
          "Name": "USD/TWD",
          "Rate":"32.8440"
        }
      ]
    }
  }
}
```

Array.prototype.reduce()
```
r[v['id']] = parseFloat(v['Rate']);
```

```
{ USDTWD: 32.844 } 
{ USDTWD: 32.844, EURTWD: 36.094 } 
{ USDTWD: 32.844, EURTWD: 36.094, JPYTWD: 0.2926 } 
{ USDTWD: 32.844, EURTWD: 36.094, JPYTWD: 0.2926, CNYTWD: 5.0417 }
```