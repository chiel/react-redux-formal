/* eslint-disable global-require */
require('globby').sync(`${__dirname}/**/*-spec.js`).forEach(file => {
	require(file);
});
