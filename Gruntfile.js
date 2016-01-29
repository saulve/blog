'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
      'Gruntfile.js',
      'assets/js/*.js',
      'assets/js/plugins/*.js',
      '!assets/js/scripts.min.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [
          'assets/js/plugins/*.js',
          'assets/js/_*.js'
          ]
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'images/',
        src: '{,*/}*.{png,jpg,jpeg}',
        dest: 'images/'
      }]
    }
  },
  svgmin: {
    dist: {
      files: [{
        expand: true,
        cwd: 'images/',
      src: '{,*/}*.svg',
      dest: 'images/'
    }]
  }
},
watch: {
  js: {
    files: [
    '<%= jshint.all %>'
    ],
    tasks: ['jshint','uglify']
  },
  options: {
    livereload: true
  },
  source: {
    files: [
      "_drafts/**/*",
      "_includes/**/*",
      "_layouts/**/*",
      "_posts/**/*",
      "css/**/*",
      "js/**/*",
      "_config.yml",
      "*.html",
      "*.md"
      ],

    tasks: [
      "exec:jekyll"
    ]
  }
},

clean: {
  dist: [
  'assets/js/scripts.min.js'
  ]
},

copy: {
  jquery: {
    files: [{
      expand: true,
      cwd: "bower_components/jquery/dist/",
      src: "jquery.min.js",
      dest: "vendor/js/"
    }]
  }
},
bootstrap: {
  files: [{
    expand: true,
    cwd: "bower_components/bootstrap/dist/css/",
    src: "bootstrap.min.css",
    dest: "vendor/css/"
  
},
{
  expand: true,
  cwd: "bower_components/bootstrap/dist/js/",
  src: "bootstrap.min.js",
  dest: "vendor/js/"
}]
},

exec: {
  jekyll: {
    cmd: "bundle exec jekyll build --trace"
  }
},

// watch: {
//   options: {
//     livereload: true
//   }
//   source: {
//     files: [
//       "_drafts/**/*",
//       "_includes/**/*",
//       "_layouts/**/*",
//       "_posts/**/*",
//       "css/**/*",
//       "js/**/*",
//       "_config.yml",
//       "*.html",
//       "*.md"
//       ],

//     tasks: [
//       "exec:jekyll"
//     ]
//   }
// },

connect: {
  server: {
    options: {
      port: 4000,
      base: '_site',
      livereload: true
    }
  }
}

});

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'uglify',
    'imagemin',
    'svgmin',
    'serve'
    ]);
  grunt.registerTask('dev', [
    'watch'
    ]);
  grunt.registerTask('build', [
    'copy',
    'exec:jekyll'
    ]);

  grunt.registerTask('serve', [
    'build',
    'connect:server',
    'watch'
  ]);
};