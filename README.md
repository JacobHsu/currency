# nodejs

`npm init`  
`npm install express --save`  

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

