// https://www.npmjs.com/package/axios
const axios = require('axios');
// https://www.npmjs.com/package/cheerio
const cheerio = require('cheerio');

const baseUrl = 'https://movie.douban.com/top250';

function doubanCrawler(url,movies = []){
// Make a request for a user with a given ID 
	axios.get(url)
  	.then(function (response) {
   		// https://www.npmjs.com/package/cheerio
    	const $ = cheerio.load(response.data);
    	// 取到  类名为  grid_view 下的  item 元素
    	const lis = $('.grid_view .item');
    	lis.each(function(index,elem){
    		const title = $(elem).find('.info .hd .title').first().text().trim();
    		const cover = $(elem).find('.pic img').attr('src');
    		const description = $(elem).find('.info .bd p').first().text().trim();
    		// 评分
    		const star = $(elem).find(' .star .rating_num').text().trim();
    		movies.push({
	    		title:title,
    			cover:cover,
    			description:description,
    			star:star
    		})
    	})
    	const nextUrl = $('.next a').attr('href');
    	// console.log(nextUrl);
    	// 如果有下一页 则 拼接 url, 否则 打印
    	if(nextUrl){
    		doubanCrawler(baseUrl+nextUrl,movies);
    	}else{
    		console.log(movies);
    	}
	})
}
doubanCrawler(baseUrl);
