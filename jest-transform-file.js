const { createTransformer } = require("babel-jest");

module.exports = createTransformer({
    process(src, filename, config, options) {
        return "module.exports = " + JSON.stringify(filename) + ";";
    },
});
