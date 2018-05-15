module.exports = function (grunt) {
	'use strict';
	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		'axe-selenium': {
            options: {
                tags: 'wcag2a'
              },
			urls: [
                'https://www.sony.co.uk',
                'https://www.sony.co.uk'
			]
		}
	});

	grunt.registerTask('test', ['axe-selenium']);
};
