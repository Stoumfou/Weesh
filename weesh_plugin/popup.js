var delIndex;
var imgs = [];
var urls = [];
var names = [];
var prices = [];

chrome.runtime.sendMessage({method:'getUrls'}, function(listUrls){
    if (typeof listUrls != 'undefined' && listUrls != null && listUrls.length != 0) {
        urls = listUrls;
        urls.forEach(myFunction);
        
        chrome.runtime.sendMessage({method:'getImgs'}, function(img){
            if (typeof img != 'undefined' && img != null && img.length != 0) {
                setImgs(img);
                
                chrome.storage.sync.get("localImgList", function(imgsL) {
                    if(typeof imgsL['localImgList'] != 'undefined') 
                        imgs = imgsL['localImgList'].concat(imgs);
                    chrome.storage.sync.set({'localImgList':imgs}, function() {});
                });
            }
        });
        
        chrome.runtime.sendMessage({method:'getNames'}, function(name){
            if (typeof name != 'undefined' && name != null && name.length != 0) {
                setNames(name);
                
                chrome.storage.sync.get("localNameList", function(namesL) {
                    if(typeof namesL['localNameList'] != 'undefined') 
                        names = namesL['localNameList'].concat(names);
                        console.log(names);
                    chrome.storage.sync.set({'localNameList':names}, function() {});
                });
            }
        });
        chrome.runtime.sendMessage({method:'getPrices'}, function(price){
            if (typeof price != 'undefined' && price != null && price.length != 0) {
                setPrices(price);
                
                chrome.storage.sync.get("localPriceList", function(pricesL) {
                    if(typeof pricesL['localPriceList'] != 'undefined')
                        prices = pricesL['localPriceList'].concat(prices);
                    chrome.storage.sync.set({'localPriceList':prices}, function() {});
                });
            }
        });

        chrome.storage.sync.get("localUrlList", function(items) {
            if(typeof items['localUrlList'] != 'undefined')
                urls = items['localUrlList'].concat(urls);
            
            chrome.storage.sync.set({'localUrlList':urls}, function() {
                console.log("save urls");
                console.log(urls);
            });
        });
        chrome.runtime.sendMessage({method:'resetItems'}, function(urls){});
    }
});

function setImgs(img) {
    imgs = img; 
    var i = 0;
    $("#list img").each(function() {
        if ($(this).attr("src")=="null") {
            $(this).attr("src", imgs[i]);
            i++;
        }
        });    
}

function setNames(name) {
    names = name;
    var j = 0;
    
    $("#list a").each(function() {
            if($(this).text() == "null") { 
                $(this).text(names[j]);
                j++;
            }
        }); 
}

function setPrices(price){
    prices = price;
    var j = 0;
    console.log('je vais mettre des prix');
    console.log(prices);
    $("#list span").each(function() {
        if($(this).text() == "") {
            $(this).text(prices[j]);
            j++;
        }
        }); 
}

function myFunction(item, index) {
    if(item==null)return;
    index = $('#list li').length;
    $('#list').append('<li id="elementInWeeshList'+index+'"><img class="imgItem" src="null" alt="" id="uneImage" /><span classe="price"></span><button type="button" class="btn btn-danger delete">X</button><a href="'+item+'">null</a></li>');
    $('#list li:last-child').on('click', 'a', function(){
        chrome.tabs.create({url: $(this).attr('href')});
        return false;
    });
    
    $(document).on('click', '.delete', function() {
        var index = $(this).parent().attr('id');
        index = index.substr(18); 
        delIndex = index;
        chrome.storage.sync.get('localUrlList', function(items) {
            if (!chrome.runtime.error) {
                items['localUrlList'].splice(delIndex,1);
                chrome.storage.sync.set({'localUrlList':items['localUrlList']}, function() {
                    
                });
            }
        });
        
        chrome.storage.sync.get('localImgList', function(items) {
            if (!chrome.runtime.error) {
                items['localImgList'].splice(delIndex,1);
                chrome.storage.sync.set({'localImgList':items['localImgList']}, function() {
                });
            }
        });
        
        chrome.storage.sync.get('localNameList', function(items) {
            if (!chrome.runtime.error) {
                items['localNameList'].splice(delIndex,1);
                chrome.storage.sync.set({'localNameList':items['localNameList']}, function() {
                });
            }
        });
        
        chrome.storage.sync.get('localPriceList', function(items) {
            if (!chrome.runtime.error) {
                items['localPriceList'].splice(delIndex,1);
                chrome.storage.sync.set({'localPriceList':items['localPriceList']}, function() {
                });
            }
        });
        
        $(this).parent().remove();
        refreshId();
    });
}

function refreshId(){
    var count = 0;
    $('#list').find('li').each(function(){
            var current = $(this);
            current.attr("id","elementInWeeshList"+count);
            count++;
        });
}

$("#clear").click( function() {
    chrome.storage.sync.set({'localUrlList':[]}, function() {
        $('#list').empty();
    });
    chrome.storage.sync.set({'localImgList':[]}, function() {
    });
    chrome.storage.sync.set({'localNameList':[]}, function() {
    });
    chrome.storage.sync.set({'localPriceList':[]}, function() {
    });
});


chrome.storage.sync.get("localUrlList", function(items) {
if (!chrome.runtime.error) {
    console.log(items);
    if (items['localUrlList'] != null) {
        elements = items['localUrlList'];
        $('#list').empty();
        console.log(elements);
        elements.forEach(myFunction);
        
        chrome.storage.sync.get("localImgList", function(items) {
            console.log(items);
            if (items['localImgList'] != null) {
                elements = items['localImgList'];
                setImgs(elements);
                console.log(elements);
            }
        });
        
        chrome.storage.sync.get("localNameList", function(items) {
            console.log(items);
            if (items['localNameList'] != null) {
                elements = items['localNameList'];
                setNames(elements);
                console.log(elements);
            }
        });
        
        chrome.storage.sync.get("localPriceList", function(items) {
            console.log(items);
            if (items['localPriceList'] != null) {
                elements = items['localPriceList'];
                setPrices(elements);
                console.log(elements);
            }
        });
    }
}
});


$(document).ready(function () {
                $("div.tabs").tabs();
                $('#registerButton').on('click', function(){
                    chrome.tabs.create({url: "http://www.google.fr"});
                    return false;
                });
                $('#amazonButton').on('click', function(){
                    chrome.tabs.create({url: "https://www.amazon.fr/"});
                    return false;
                });
                $('#fnacButton').on('click', function(){
                    chrome.tabs.create({url: "http://www.fnac.com/"});
                    return false;
                });
            }); 