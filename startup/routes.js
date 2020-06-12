const defualt = require('../routes/index');
const auth = require('../routes/auth');
const user = require('../routes/user');
const wallet = require('../routes/wallet');
const networkNode = require('../routes/networkNode');

module.exports = function(app){
    app.use('/', defualt),
    app.use('/api/v1/auth', auth),
    app.use('/api/v1/user', user),
    app.use('/api/v1/wallet', wallet),
    app.use('/api/v1/networkNode', networkNode);
};

