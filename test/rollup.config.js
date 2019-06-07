import svgicons from './../dist/index.esm.min.js';


export default {
	input: 'test/main.js',
	output: {
		format: 'iife',
		name: 'app',
		file: 'test/bundle.js'
	},
	plugins: [
		svgicons({
			inputFolder: 'test/icons',
			output: 'test/bundle.svg',
			minify: false
		})
	]
};
