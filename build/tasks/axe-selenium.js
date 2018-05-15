/*jshint node: true */
'use strict';

var WebDriver = require('selenium-webdriver'),
	AxeBuilder = require('axe-webdriverjs');

module.exports = function (grunt) {
	grunt.registerMultiTask('axe-selenium', function () {

		var done = this.async(),
			count = this.data.length;

		var driver = new WebDriver.Builder()
			.forBrowser('chrome')
			.build();

		driver.manage().timeouts().setScriptTimeout(10000);

		this.data.forEach(function (testUrl) {
			driver.get(testUrl)
				.then(function () {
					AxeBuilder(driver)
						.analyze(function (result) {

                            console.log(result.url ,'Violations: ', result.violations.length);

							grunt.file.write(result.url.replace(/[^a-z0-9]/gi, '-')
								.replace(/-{2,}/g, '-').replace(/^-|-$/g, '').toLowerCase() + '.json',
                                JSON.stringify(result.violations, null, '  '));

							if (result.violations.length === 0) {
								driver.quit();
								done(result.violations.length === 0);
							}
						});
					});
				});
	});
};
