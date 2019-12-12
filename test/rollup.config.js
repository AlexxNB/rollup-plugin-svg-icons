import svgicons from './../dist/index.mjs';

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
	output: 'test/output/sprite-test1.svg'
}

const test2 = {
	inputFolder: 'test/icons',
	output: 'test/output/sprite-test2.svg',
	inline: false
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
