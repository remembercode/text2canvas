module.exports = convert

function convert(font, text, options){
	var fonts = 'fonts/WeiRuanYaHei.ttf';
	var pw = 144;
	var ph = 104;
	var text = "≤‚ ‘";
	var text2png = {};
	
	text2png.svg = {};
	text2png.window = {};
	text2png.canvas = {};
	text2png.image = {};
	text2png.blob = {};
	text2png.dom = {};
	text2png.png = {};
	
	text2png.svg.lib = Promise.resolve(require('text2svg'));
	//var Text2svg = require('text2svg');
	
	//var text2svg = new Text2svg(fonts);
	text2png.svg.init = text2png.svg.lib.then(function (lib) {
		return Promise.resolve(new lib(fonts));
	}, function (error) {
		console.error(error);
		return Promise.reject(error);
	}).catch(function (error) {
		console.error(error);
		return Promise.reject(error);
	});
	
	text2png.svg.wrapper = text2png.svg.init.then(function (converter) {
		return Promise.resolve(converter.toSVG(text));
	}, function (error) {
		console.error(error);
		return Promise.reject(error);
	}).catch(function (error) {
		console.error(error);
		return Promise.reject(error);
	});
	//var svgWrapper = text2svg.toSVG(text);
	
	text2png.svg.content = text2png.svg.wrapper.then(function (wrapper) {
		if (!Array.isArray(wrapper.svg)) {
			return Promise.resolve([wrapper.svg]);
		}
		return Promise.resolve(wrapper.svg);
	}, function (error) {
		console.error(error);
		return Promise.reject(error);
	}).catch(function (error) {
		console.error(error);
		return Promise.reject(error);
	});
	
	//var svg = svgWrapper.svg;
	
	text2png.canvas.lib = Promise.resolve(require('get-canvas-context'));
	
	text2png.canvas.context = text2png.canvas.lib.then(function (lib) {
		return Promise.resolve(lib('2d', {
			width: pw, height: ph
		}));
	}, function (error) {
		console.error(error);
		return Promise.reject(error);
	}).catch(function (error) {
		console.error(error);
		return Promise.reject(error);
	});
	
	text2png.window.url = Promise.resolve(window.URL || window.webkitURL || window.mozURL || window.msURL);
	
	text2png.blob.new = text2png.svg.content.then(function (svg) {
		return Promise.resolve(new window.Blob(svg, {
			type: 'image/svg+xml;charset=utf-8'
		}));
	}, function (error) {
		console.error(error);
		return Promise.reject(error);
	}).catch(function (error) {
		console.error(error);
		return Promise.reject(error);
	});
	
	text2png.dom.url = Promise.all([text2png.window.url, text2png.blob.new]).then(function (values) {
		var winUrl = values[0];
		var blob = values[1];
		return Promise.resolve(winUrl.createObjectURL(blob));
	}, function (error) {
		console.error(error);
		return Promise.reject(error);
	}).catch(function (error) {
		console.error(error);
		return Promise.reject(error);
	});
	
	text2png.image.create = Promise.resolve(document.createElement('img'));
	
	text2png.image.onload = Promise.all([text2png.image.create, text2png.dom.url]).then(function (values) {
		var image = values[0];
		var url = values[1];
		return new Promise(function (resolve, reject) {
			image.locked = false;
			image.src = url;
			image.onload = function () {
				resolve(this);
			};
			image.onerror = reject;
		});
	}, function (error) {
		console.error(error);
		return Promise.reject(error);
	}).catch(function (error) {
		console.error(error);
		return Promise.reject(error);
	});
	
	return text2png.canvas.draw = Promise.all([text2png.image.onload,
		text2png.window.url, text2png.dom.url, text2png.canvas.context]).then(function (values) {
		var image = values[0];
		var winUrl = values[1];
		var url = values[2];
		var context = values[3];
		if (image.locked) return;
		image.locked = true;
		winUrl.revokeObjectURL(url);
		context.drawImage(image, 0, 0);
		return Promise.resolve(context.canvas);
	}, function (error) {
		console.error(error);
		return Promise.reject(error);
	}).catch(function (error) {
		console.error(error);
		return Promise.reject(error);
	});
}