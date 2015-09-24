/**
 * Created by GG on 15/8/17.
 */

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        version: Date.now(),
        clean: ['publish'],
        copy: {
            html: {
                expand: true,
                cwd: 'build',
                src: ['*.html', 'share-icon.png'],
                dest: 'publish/html'
            },
            asset: {
                expand: true,
                cwd: 'build',
                src: ['**/*', '!*.html', '!share-icon.png'],
                dest: 'publish/asset/<%=version %>'
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'href="css/index.min.css"',
                            replacement: 'href="http://img<%=Math.ceil(Math.random() * 6) %>.cache.netease.com/utf8/3g/gg/' +
                            '<%=pkg.name %>/<%=version %>/css/index.min.css"'
                        },
                        {
                            match: 'src="js/index.min.js"',
                            replacement: 'src="http://img<%=Math.ceil(Math.random() * 6) %>.cache.netease.com/utf8/3g/gg/' +
                            '<%=pkg.name %>/<%=version %>/js/index.min.js"'
                        }
                    ],
                    usePrefix: false
                },
                files: [{
                    src: 'publish/html/index.html',
                    dest: 'publish/html/index.html'
                }]
            }
        },
        ftps_deploy: {
            test: {
                options: {
                    auth: {
                        host: '220.181.98.57',
                        port: '2100',
                        authKey: 'test'
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'build',
                    src: ['**/*'],
                    dest: '/gg/<%=pkg.name %>'
                }]
            },
            publish_html: {
                options: {
                    auth: {
                        host: '220.181.29.249',
                        port: '16321',
                        authKey: 'publish_html'
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'publish/html',
                    src: ['**/*'],
                    dest: '/gg/<%=pkg.name %>'
                }]
            },
            publish_asset: {
                options: {
                    auth: {
                        host: '61.135.251.132',
                        port: '16321',
                        authKey: 'publish_asset',
                        secure: true
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'publish/asset',
                    src: ['**/*'],
                    dest: '/utf8/3g/gg/<%=pkg.name %>'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-ftps-deploy');

    grunt.registerTask('test', ["ftps_deploy:test"]);
    grunt.registerTask('publish', ["clean", "copy", "replace", "ftps_deploy:publish_html", "ftps_deploy:publish_asset"]);
    grunt.registerTask('default', ["test", "publish"]);
};