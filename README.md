# rollup-plugin-svg-icons

Bundles all svg icons from the speciefed folder to the single spritesheet svg file.

## Installation

```bash
npm i -D rollup-plugin-svg-icons
```

## Rollup configuration

```javascript
/* rollup.config.js */
import svgicons from 'rollup-plugin-svg-icons'

export default {
...
  plugins: [
    svgicons({
        // folder with svg-icons
        inputFolder: 'src/icons',  // it is default value

        // path for the sprite file
        output: 'dist/bundle.svg', // it is default value

        // output file minification
        minify: true // default value is 'false'
	})
    ...
  ]
  ...
}
```

## Usage in HTML

```html
<style>
.inline-svg-icon{
  display: inline-block;
  fill: currentColor;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
</style>

<svg class="inline-svg-icon">
  <use xlink:href="bundle.svg#iconid"></use>
</svg>
```

## Inspiration
Some ideas were peeped from [vladshcherbin](https://github.com/vladshcherbin/rollup-plugin-svg-sprite)

## License
MIT