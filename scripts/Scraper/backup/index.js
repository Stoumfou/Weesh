var Xray = require('x-ray')
	x = Xray(),
	xDelay = Xray().delay('1s','10s'),
	URL = require('url-parse'),
	cheerio = require('cheerio')
	request = require('request'),
	probe = require('probe-image-size');

exports.images = function(url, callback, scope){

	request(url, function(err, resp, html){

		var $ = cheerio.load(html);
		var minThreshold = 400;
		var scope = (scope) ? scope : 'body';

		var _images = [], _index = 0, totalImages = $(scope).find('img[src]').length;

		$(scope).find('img[src]').each(function(){
			var src = $(this).attr('src');
			probe({ url: src, timeout: 2500 }, function(err, result){
				if(result && result.mime !== 'image/gif' && result.width > minThreshold)
				{
					_images.push({
						width: result.width,
						height: result.height,
						src: src
					});
				}

				_index++;
				if(_index == totalImages)
				{
					_images.sort(function(a,b){
						return b.width - a.width;
					});

					_images = _images.splice(0, 4);

					if(typeof callback == 'function') callback(_images);
				}
			});
		});

	});

}

exports.sites = {
	base: function(){
		return {
			id: '', 
			isbn: '', 
			title: '',
			original_price: '',
			price: '',
			image: '',
			brand: '',
			details: '',
			description: ''
		};
	},
	amazon: function(product_id){

		var productSelector = this.base();

		productSelector.id = '#ASIN@value'; 
		productSelector.isbn = '#ASIN@value';
		productSelector.title = '#productTitle';
		productSelector.original_price = x('.a-text-strike');
		productSelector.image = xDelay('#landingImage@data-old-hires');
		productSelector.price = '#priceblock_ourprice';
		productSelector.brand = '#brand';
		productSelector.details = x(['#feature-bullets > ul > li']);
		productSelector.description = '#productDescription';

		var pageURL = 'http://www.amazon.com' + product_id;

		return {
			page: pageURL,
			selectors: productSelector,
			images: true
		};

	},
	fnac: function(path) {

		var productSelector = this.base();

		productSelector.id = 'body@data-prid';
		productSelector.title = 'meta[property="og:title"]@content';
		productSelector.original_price = '.oldPrice';
		productSelector.price = '.product-price';
		productSelector.brand = 'span[itemprop="manufacturer"]';
		productSelector.details = x(['.whiteContent > ul > li']);
		productSelector.description = 'meta[property="og:description"]@content';
		productSelector.image = xDelay('meta[property="og:image"]@content');

		var pageURL = 'http://www.fnac.com/' + path;

		return {
			page: pageURL,
			selectors: productSelector
		};

	}, 
	livrefnac: function(path) { 

		var productSelector = this.base();

		productSelector.id = 'body@data-prid'; 
		productSelector.isbn = 'meta[property="og:isbn"]@content';
		productSelector.title = 'meta[property="og:title"]@content';
		productSelector.original_price = '.oldPrice';
		productSelector.price = '.product-price';
		productSelector.details = x(['.whiteContent > ul > li']);
		productSelector.description = 'meta[property="og:description"]@content';
		productSelector.image = xDelay('meta[property="og:image"]@content');

		var pageURL = 'http://livre.fnac.com/' + path;

		return {
			page: pageURL,
			selectors: productSelector
		};

	}, 
	bestbuy: function(path) {

		var productSelector = this.base();

		productSelector.id = '#sku-value'; 
		productSelector.title = 'meta[property="og:title"]@content';
		productSelector.original_price = '.regular-price';
		productSelector.price = '.item-price';
		productSelector.brand = '#schemaorg-brand-name@content';
		productSelector.details = x(['.item-price']);
		productSelector.description = 'meta[property="og:description"]@content';
		productSelector.image = xDelay('meta[property="og:image"]@content');
		productSelector.tags = 'meta[name="keywords"]@content';

		var pageURL = 'http://www.bestbuy.com/site/' + path;

		return {
			page: pageURL,
			selectors: productSelector
		};

	},
	target: function(path){

		var productSelector = this.base();

		productSelector.title = x('#ProductDetailsTop > div:nth-child(6) > div.contentRight.primaryImgContainer > h2 > span');
		productSelector.image = xDelay('#heroImage@src');
		productSelector.price = '#price_main > div > span > span';
		productSelector.description = '#item-overview > div > div:nth-child(1) > div:nth-child(1) > div > p > span';
		productSelector.details = x(['#item-overview > div > div:nth-child(1) > div:nth-child(1) > ul li']);

		var pageURL = 'http://www.target.com/p/' + path;

		return {
			page: pageURL,
			selectors: productSelector
		};

	}
	
};

exports.scraper = function(opts, callback){

	var data, lookup, self = this;

	if(this.sites[opts.site])
	{
		lookup = this.sites[opts.site](opts.product_id);

		x(lookup.page, lookup.selectors)
		(function(err, obj){
			var _obj = obj;
			_obj.url = lookup.page;

			if(_obj.details)
			{
				var details = [];
				_obj.details.forEach(function(element, index, array){
					details.push(element
					.replace(/(?:\t|\r|\n)/g, '')
					.replace(/ +(?= )/g,''));
				});
				_obj.details = details;
			}

			if(_obj.id) _obj.id = _obj.id.trim(); 
			if(_obj.isbn) _obj.isbn = _obj.isbn.trim(); 
			if(_obj.original_price) _obj.original_price = _obj.original_price.trim(); 
			// RAJOUTER CONDITION POUR BESTBUY
			if(_obj.original_price) _obj.original_price = _obj.original_price.trim().replace('(Reg. ', '').replace(')', ''); 
			// RAJOUTER CONDITION POUR DESCRIPTIONS AMAZON
			if(_obj.description) _obj.description = _obj.description.trim()
					.replace(/(?:\t|\r|\n)/g, '')
					.replace(/ +(?= )/g,'');
			if(_obj.title) _obj.title = _obj.title.trim();
			if(_obj.price) _obj.price = _obj.price.trim();
			if(_obj.brand) _obj.brand = _obj.brand.trim();

			if(lookup.images)
			{
				self.images(_obj.url, function(images){
					_obj.images = images;
					callback(_obj);
				});
			}
			else
			{
				callback(_obj);
			}

		});
	}
	else
	{
		var selectors = {
			id: '[itemprop="product-id"]',
			brand: '[itemprop="brand"]',
			description: '[itemprop="description"]',
			title: 'meta[property="og:title"]@content',
			image: xDelay('[itemprop="image"]@src'),
			price: '[itemprop="price"]'
		};

		x(opts.url, selectors)
		(function(err, obj){

			self.images(opts.url, function(images){
				obj.images = images;
				callback(obj);
			});

		});
	}
}

exports.parseURL = function(url, callback){

	var parse = new URL(url);

	if(parse.host == 'www.amazon.com')
	{
		this.scraper({
			site: 'amazon',
			product_id: parse.pathname + parse.query
		}, callback);
	}
	else if(parse.host == 'www.fnac.com') 
	{
		this.scraper({
			site: 'fnac',
			product_id: parse.pathname.replace('/w-4', '').match(/a\d{7}/)
		}, callback);
	}
	else if(parse.host == 'livre.fnac.com')  
	{
		this.scraper({
			site: 'livrefnac',
			product_id: parse.pathname.replace('/', '').match(/a\d{7}/)
		}, callback);
	}
	else if(parse.host == 'www.bestbuy.com')
	{
		this.scraper({
			site: 'bestbuy',
			product_id: parse.pathname.replace('/site/','') + parse.query
		}, callback);
	}
	else if(parse.host == 'www.target.com')
	{
		var matches = parse.pathname.match(/\/p\/(.*)/);
		var path = (matches[1]) ? matches[1] : false;

		this.scraper({
			site: 'target',
			product_id: path
		}, callback);
	}
	else
	{
		this.scraper({
			site: false,
			url: url
		}, callback);
	}

}

exports.init = function(url, callback){
	if(!url || !callback) return false;
	this.parseURL(url, callback);
}
// pass through for parseURL in case architecture changes
