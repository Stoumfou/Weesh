chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo && changeInfo.status == "complete"){
        console.log("Tab updated: " + tab.url);
        chrome.tabs.sendMessage(tabId, {data: tab}, function(response) {
            console.log(response);
        });

    }
});


var urls = [];
var imgs = [];
var names = [];
var prices = [];

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.method == 'setItem') {
        urls.push(message.url);
        imgs.push(message.img);
        names.push(message.name);
        prices.push(message.price);
    }
    else if(message.method == 'getUrls'){
        sendResponse(urls);
    }
    else if(message.method == 'getImgs'){
        sendResponse(imgs);
    }
    else if(message.method == 'getNames'){
        sendResponse(names);
    }
    else if(message.method == 'getPrices'){
        sendResponse(prices);
    }
    else if(message.method == 'resetItems'){
        urls = [];
        imgs = [];
        names = [];
        prices = [];
    }
});