module.exports = function() {
    return {
        sources: {
            index: 'src/index.html',
            scripts: 'src/*.js',
        },
        release: {
            index: 'release',
            scripts: 'release/js',
        }
    };
};