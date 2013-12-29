
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

  g.loadNpmTasks 'grunt-contrib-jshint'
  g.loadNpmTasks 'grunt-mocha-test'

  g.registerTask 'default', ['jshint', 'mochaTest']
