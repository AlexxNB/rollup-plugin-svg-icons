import svgicons from './../dist/index.esm.min.js';

const baseConfig = {
	input: 'test/main.js',
	output: {
		format: 'iife',
		name: 'app',
		file: 'test/bundle.js'
	}
}

const defaults = {
	inputFolder: 'test/icons',
	output: 'test/bundle.svg',
	minify: false
}

export default [
	{
		...baseConfig,
		plugins: [
			svgicons(defaults)
		]
	},
	{
		...baseConfig,
		output: {
			...baseConfig.output,
			file: 'test/bundle-svgo.js' // to differ from bundle (w/o svg) in the console
		},
		plugins: [
			svgicons({
				...defaults,
				output: 'test/bundle-svgo.svg',
				svgo: {
					plugins: [{
						removeViewBox: false
					}]
				}
			})
		]
	}
];
