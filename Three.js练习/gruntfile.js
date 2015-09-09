/**
 * Created by GG on 15/9/9.
 */

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ftps_deploy: {
            target: {
                options: {
                    auth: {
                        host: '220.181.98.57',
                        port: '2100',
                        authKey: 'test'
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'demo',
                    src: ['**/*'],
                    dest: '/gg/<%=pkg.name %>'
                }]
            }
        }
    });


    grunt.loadNpmTasks('grunt-ftps-deploy');

    grunt.registerTask('default', ["ftps_deploy"]);
};