
module.exports = (g) ->

  g.initConfig

    jshint:

      all: ['src/**/*.js', 'spec/**/*.js']
      options:
        jshintrc: '.jshintrc'

    mochaTest:

      spec:
        src: ['spec/**/*.js']
        options:
          reporter: 'spec'

      'html-cov':
        src: ['spec/**/*.js']
        options:
          reporter: 'html-cov'
          require: './blanket'
          quiet: true
          captureFile: 'coverage.html'

      'lcov':
        src: ['spec/**/*.js']
        options:
          reporter: 'mocha-lcov-reporter'
          require: './blanket'
          quiet: true
          captureFile: 'lcov.dat'


  g.loadNpmTasks 'grunt-contrib-jshint'
  g.loadNpmTasks 'grunt-mocha-test'

  g.registerTask 'default', ['jshint', 'mochaTest:spec']
  g.registerTask 'cov', ['jshint', 'mochaTest:html-cov']
