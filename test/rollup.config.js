import svgicons from './../dist/index.esm.min.js';

const baseConfig = {
	input: 'test/main.js',
	output: {
		format: 'iife',
		name: 'app',
		file: 'test/output/bundle.js'
	}
}

const test1 = {
	inputFolder: 'test/icons',
	output: 'test/output/sprite-test1.svg',
	svgo: false
}

const test2 = {
	inputFolder: 'test/icons',
	output: 'test/output/sprite-test2.svg',
	svgo: {
		plugins: [{
			removeViewBox: false
		}]
	}
}

export default [
	{
		...baseConfig,
		plugins: [
			svgicons(test1)
		]
	},
	{
		...baseConfig,
		plugins: [
			svgicons(test2)
		]
	}
];
