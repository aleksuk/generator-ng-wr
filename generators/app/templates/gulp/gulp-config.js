var path = require('path'),
    defaultConfigs = {
        dependencies: path.join(process.cwd(), 'src/dependencies.json'),
        relativeDistPath: path.join(process.cwd(), 'dist'),
        srcPrefix: 'src/'
    };

module.exports = defaultConfigs;
