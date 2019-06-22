import fs from 'fs'
import path from 'path'
import cheerio from 'cheerio'
import pretty from 'pretty'
import { minify } from 'html-minifier'
import SVGO from 'svgo';

function parseCode(code) {
  return cheerio.load(code, { xmlMode: true })
}

function createSymbol(id, code) {
  const svgicon = parseCode(code)('svg');
  const symbol = parseCode('<symbol/>');
  symbol('symbol')
    .append(svgicon.children())
    .attr('id', id)
    .attr('viewBox', svgicon.attr('viewBox'))

  return symbol.html();
}

function createSprite(symbols, minimization) {
  const svgsprite = parseCode('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" />')

  symbols.forEach((symbol) => {
    svgsprite('svg').append(symbol)
  })

  return minimization
    ? minify(svgsprite.html(), { collapseWhitespace: true })
    : pretty(svgsprite.html())
}

export default function svgicons(options = {}) {
  const minify = options.minify || false;
  const inputFolder = options.inputFolder || 'src/icons';
  const output = options.output || 'dist/bundle.svg';
  const svgo = options.svgo && new SVGO(options.svgo);

  let symbols = [];

  return {
    name: 'svelte-svgicons',
    generateBundle: async () => {
      const icons_dir = path.resolve(inputFolder);
      for (const file of fs.readdirSync(icons_dir)) {
        const svgid = path.parse(file).name
        const filepath = path.join(icons_dir, file)
        let code = fs.readFileSync(filepath, 'utf8')

        if (svgo) {
          const { data } = await svgo.optimize(code, { path: filepath })
          code = data;
        }
        
        symbols = [...symbols, createSymbol(svgid, code)];
      }

      if (symbols.length > 0) {
        fs.writeFileSync(path.resolve(output), createSprite(symbols, minify));
      }
    }
  }
}
