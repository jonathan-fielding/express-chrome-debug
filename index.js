const CryptoJS = require('crypto-js');
const vary = require('vary');
const moment = require('./utils/moment');
const defaultKey = 'rBiycQDurzDmaLaKGrPCxwYFfgmxnuadPhddidvg2XAvhCUiZHProzPqpVYwsZbD';
const cwd = require('process').cwd();
const packageJson = require(`${cwd}/package.json`);

const debugScript = json => {
    return `<script>
        window.__expressDebugData = ${JSON.stringify(json)}
    </script>`;
};

module.exports = function (options) {
    const secretKey = options && options.secretKey ? options.secretKey : defaultKey;

    if (secretKey === defaultKey) {
        console.warn('Express Chrome Debug is using the default key, this is not recommended for production servers');
    }

    return function(req, res, next) {
        const _render = res.render;
        const debugHeader = req.headers['x-requestid'];
        const datetime = moment().tz('Europe/London').floor(15, 'minutes').format('YYYY-MM-DD HH:mm');
        const debugKey = new CryptoJS.HmacSHA1(datetime, secretKey).toString();
        const debugKeyString = debugKey.toString();

        var startDate = new Date();
    
        // 'x-requestid' is named to obscure that it will bypass cache
        vary(res, 'x-requestid');
    
        if (debugHeader === debugKeyString) {
            res.render = function render(template, json = {}, callback) {
                // Do your operations
                var endDate   = new Date();
                var loadingTime = (endDate.getTime() - startDate.getTime());

                const debugJson = {
                    _timings: { // Performance timings
                        renderTime: loadingTime,
                    },
                    _packageJson: packageJson,
                    pageData: json, // The json used to render the page
                };
                
                // Render the debugJson to a script
                json.__debug = debugScript(debugJson);

                _render.call(this, template, json, callback);
            };
        }
    
        next();
    };
}