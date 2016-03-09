var fx = require('../lib/currency');
fx.rate(fx.getSupportPair('TWD')).then(console.log);