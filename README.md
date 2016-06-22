#depences
text2svg
#promise
return a promise

## Options

### x

Horizontal position of the beginning of the text. (default: 0)

### y

Vertical position of the baseline of the text. (default: 0)

### fontSize

Size of the text. (default: 72)

### spacing

The letter spacing. (default: 0)

### kerning

 If `true` takes `kerning` information into account. (default: `true`)

### divided

If `true` generates individual path for every char. (default: `false`)

### grouped

If `true` groups the individual `<path>` with `<g></g>` element. (default: `false`)

This option only works for `toSVG()`.

### title

If specified will generate a `<title>` at the root of `<svg>`. (default: `text`)

This option only works for `toSVG()`.

### desc

If specified will generate a `<desc>` at the root of `<svg>`. (default: `null`)

This option only works for `toSVG()`.

### Styling the elements

Specify the padding of the `<path>` relative to the `<svg>`: 

- options.padding
- options.paddingTop/options['padding-top']
- options.paddingRight/options['padding-right']
- options.paddingBottom/options['padding-bottom']
- options.paddingLeft/options['padding-left']

The `<svg>`, `<path>` and `<g>` elements can be styled by any valid attributes. 

The generated `<svg>` has the following default attributes:

```js
{
	'version'    : '1.1',
    'xmlns'      : 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    'role'   : 'img',
    'width'  : width,
    'height' : height,
    'viewbox': [x, y, width, height].join(' ')
}
```

We can **add**/**update**/**remove** by `options.svg`:

```js
options.svg = {
	'version': '',     // remove this attribute
    'role'   : 'logo', // update this attribute
    'fill'   : 'red'   // add some custiom styles
}
```

**Note** that the `width`, `height` and `viewbox` can't be specified.

Styling the `<path>` by `options.path`. If `divided` is `true` we can style the individual `<path>` element by `options.path?`, which `?` is the index of each char in the `text`:

```js
// style for every path(s)
options.path  = {
    'fill': yellow
};

// style the first char
options.path0 = {
    'fill': '#FF0000',
    'stroke': '#000000'
};
```

As the same `options.g` specified the style of `<g>` element. 

