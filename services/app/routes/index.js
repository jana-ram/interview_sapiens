module.exports = (app) => {
    require('./health.routes')(app);
    require('./auth.routes')(app);
    require('./theme.routes')(app);
};
