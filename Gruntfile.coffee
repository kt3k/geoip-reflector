
module.exports = (g) ->

  g.initConfig

    jshint:

      all: 'src/**/*.js'
      options:
        jshintrc: '.jshintrc'

  g.loadNpmTasks 'grunt-contrib-jshint'

  g.registerTask 'default', ['jshint']
