import fs from 'fs'
import path from 'path'
import cheerio from 'cheerio'
import pretty from 'pretty'
import { minify } from 'html-minifier'

function parseCode(code) {
  return cheerio.load(code, { xmlMode: true })
}

function createSymbol(id, code) {
  const svgicon = parseCode(code)('svg');
  const symbol = parseCode('<symbol/>');
  symbol('symbol')
    .attr('id', id)
    .attr('viewBox', svgicon.attr('viewBox'))
    .append(svgicon.children());

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
  
  let symbols = [];

  return {
    name: 'svelte-svgicons',
    generateBundle: (details) => {
      const icons_dir = path.resolve(inputFolder);
      fs.readdirSync(icons_dir).forEach(file => {
        const svgid = path.parse(file).name
        const code = fs.readFileSync(path.join(icons_dir,file),'utf8');
        symbols = [...symbols, createSymbol(svgid, code)];
      });
            
      if (symbols.length > 0) {
        fs.writeFileSync(path.resolve(output), createSprite(symbols, minify));
      }
    }
  }
}
