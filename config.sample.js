module.exports = function(app) {
    return {
        CONSTANT : {
            YAHOO_API_URL : 'https://query.yahooapis.com/v1/public/yql',
            SUPPORT_CURRENCY : ['USD','EUR','JPY','TWD','CNY'],
            OPT_TIMEOUT_SEC : 30
        },
        currency_converter_cache : 'http://finance.yahoo.com/connection/currency-converter-cache?date='
    }
}