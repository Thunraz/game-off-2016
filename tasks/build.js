'use strict';

let gulp        = require('gulp'),
    rollup      = require('rollup').rollup;

module.exports = () => {
    gulp.task('copy-dependencies', () => {
        return gulp
            .src([
                './src/ext/phaser.js',

                './src/electron/electron.js'
            ])
            .pipe(gulp.dest('./dist/'))
    });

    gulp.task('build', ['copy-dependencies'], () => {
        return rollup({
            entry: 'src/js/main.js',
            sourceMap: true
        }).then(function(bundle) {
            return bundle.write({
                dest:  'dist/main.js',
                format: 'iife',
                globals: {
                    phaser:   'Phaser'
                },
            });
        });
    });
};
