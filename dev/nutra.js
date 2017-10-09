const browserifier = require('ethical-browserifier-utility')
const babelConfig = require('./babel.json')

browserifier.browserify()

module.exports = function(config) {
  config.set({
    frameworks: ['nutra-jasmine'],
    files: ['test/specs/**/*.js', 'src/**/!(bundle).js', ], // Modify to include your own app & spec files
    preprocessors: {
        'test/specs/**/*.js': ['nutra-babel'], // Modify to include your spec files.
        'src/**/*.js': ['nutra-babel', 'nutra-coverage'] // Modify to include your app files.
    },
    reporters: ['nutra-coverage'],
    babelOptions: babelConfig,
    coverageOptions: {
      reporters: [
        { type: 'html', subdir: '.' }
      ]
      // For more coverage options, see:
      // https://github.com/m-a-r-c-e-l-i-n-o/nutra-coverage
    }
  })
  // For more configuration options, see:
  // https://github.com/m-a-r-c-e-l-i-n-o/nutra#configuration-anatomy
}
