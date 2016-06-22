# text2svg

>convert text by sepcific windows font file(*.ttf) to canvas

##depences
text2svg

##beta version

Give up `text2svg` option param. Always convet text to font size 72px. 

Support Simple Chinese Fonts by [Inziu Iosevka, inziu-iosevkaCC-SC-regular.ttf](https://be5invis.github.io/Iosevka/inziu.html)

## return promise
return a promise object contains a canvas object

## for nw.js only

## how to use

            var fonts = 'fonts/inziu-iosevkaCC-SC-regular.ttf';
            fonts = path.normalize(fonts);
            fonts = path.join(nw.__dirname, fonts);
            //var text = "1ºÅ´°¿Ú";
            var text = "No1.Window";
            var png = Promise.resolve(require('text2canvas')).then(function (converter) {
                return converter(fonts, text);
            }, function (error) {
                return Promise.reject(error);
            })

