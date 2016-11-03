'use strict';

let fs   = require('fs'),
    gulp = require('gulp'),
    pkg  = require('../package.json');

module.exports = () => {
    gulp.task('electron', ['copy-dependencies'], () => {
        if (!fs.existsSync('./dist')){
            fs.mkdirSync('./dist');
        }
        
        fs.writeFile(
            './dist/package.json',
            JSON.stringify({
                name:    pkg.name,
                version: pkg.version,
                description: pkg.description,
                author: pkg.author,
                main: 'electron.js',
                devDependencies: {
                    electron: '^1.4.1'
                },
                build: {
                    appId: pkg.name,
                    mac: {
                        category: 'public.app-category.action-games'
                    },
                    win: {
                        iconUrl: 'https://some-url.to/your-icon.png',
                        target: 'nsis'
                    },
                    nsis: {
                        oneClick: false
                    }
                },
                scripts: {
                    pack: 'build --dir',
                    dist: 'build'
                }
            })
        );
    });
}