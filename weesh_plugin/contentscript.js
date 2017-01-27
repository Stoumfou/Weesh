chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("URL CHANGED: " + request.data.url);
    window.setTimeout(partA,500);
    window.setTimeout(partA,3000);
    window.setTimeout(partA,6000);
});

var btn = [];
var nodes = [];
var url = [];


var listImg = [];
var listUrl = [];
var listPrices = [];
var listNames = [];


function partA() { 
    
    //Amazon
    var a = document.getElementById('s-results-list-atf');
    //var b = document.getElementsByClassName('a-size-base a-color-price s-price a-text-bold');
    var c = document.getElementById('submit.add-to-cart-announce');
    
    if(a!=null) amazonPutButton(a);
    if(c!=null) addBigButton(c);
    
    
    //Google search
    //var b = document.getElementsByClassName('_QD _pvi');
    

    //if(a!=null) addManyButtons(a);
    //if(b!=null) addManyButtons(b);
    
}

function amazonPutButton(a){
    listImg=[];
    listNames=[];
    listUrl=[];
    listPrices=[];
    
    var count = a.children.length;
    var listLi = a.getElementsByTagName('li');

    
    for(var i = 0 ; listImg.length < count ; i++) {
        
        if(typeof listLi[i].getElementsByTagName('img')[0] != "undefined") {
            listImg.push(listLi[i].getElementsByTagName('img')[0].src);
            listNames.push(listLi[i].getElementsByTagName('h2')[0].innerHTML);
            listUrl.push(listLi[i].getElementsByTagName('a')[0].href);
            
            if(typeof listLi[i].getElementsByClassName('a-size-base a-color-price a-text-bold')[0] != "undefined")              {
            listPrices.push(listLi[i].getElementsByClassName('a-size-base a-color-price a-text-bold')[0]
                            .innerHTML);
            addButton(listImg.length-1,listLi[i]
                      .getElementsByClassName('a-size-base a-color-price a-text-bold')[0]);
            }
            
            else if (typeof listLi[i].getElementsByClassName('sx-price sx-price-large')[0] != "undefined") {
                console.log(listLi[i].getElementsByClassName('sx-price sx-price-large')[0].innerText);
                listPrices.push(listLi[i].getElementsByClassName('sx-price sx-price-large')[0]
                            .innerText);
                addButton(listImg.length-1,listLi[i]
                      .getElementsByClassName('sx-price sx-price-large')[0]);
            } else {
                listPrices.push("-1");
                continue;
            }
            
        }
    }
    
    var x = 0;
    var re = /(\d)\s+(?=\d)/g;
    
    listPrices.forEach(
        function replaceSpace() {        
            listPrices[x] = listPrices[x].replace(re, '$1,');
            x++;
        }
    );
    
    console.log(listImg);
    console.log(listNames);
    console.log(listUrl);
    console.log(listPrices);
}

function addButton(i,el){
    if (document.getElementById('weeshButtonAdded'+i))return;
        nodes[i] = document.createElement('IMG');
        btn[i] = document.createElement('BUTTON');
        nodes[i].src = 'https://i.imgsafe.org/b8ff07eb90.png';
        nodes[i].style.float = 'left';
        btn[i].id = 'weeshButtonAdded'+i;
        nodes[i].style.marginRight = '15px';
        nodes[i].style.width = '15px';
        nodes[i].style.height = '15px';
        nodes[i].style.zIndex = 1000;
        btn[i].innerText = "+";
        btn[i].appendChild(nodes[i]);
        btn[i].addEventListener('click', function() {
            addElementInList(this.id);
        }, false);
        el.style.setProperty ("background-color", "lightgrey", "important");
        insertAfter(el.parentNode, btn[i]);
}
/*
function addManyButtons(el) {
    
    for (var j = 0; j < el.length; j++) {
        if (document.getElementById('weeshButtonAdded'+j))continue;
        url[j] = el[j].parentNode;
        url[j] = url[j].getAttribute("href");
        
        nodes[j] = document.createElement('IMG');
        btn[j] = document.createElement('BUTTON');
        nodes[j].src = 'https://i.imgsafe.org/b8ff07eb90.png';
        nodes[j].style.float = 'left';
        btn[j].id = 'weeshButtonAdded'+j;
        nodes[j].style.marginRight = '15px';
        nodes[j].style.width = '15px';
        nodes[j].style.height = '15px';
        nodes[j].style.zIndex = 1000;
        btn[j].innerText = "+";
        btn[j].appendChild(nodes[j]);

        btn[j].addEventListener('click', function() {
            addElementInList(this.id);
        }, false);
        
        el[j].style.setProperty ("background-color", "lightgrey", "important");
        insertAfter(el[j].parentNode, btn[j]);
    }
}*/

function addBigButton(el) {
    if (document.getElementById('weeshBigButton0'))return;
    var pntNode = el.parentNode;
    var clone = pntNode.cloneNode(true); // "deep" clone
    var image = document.createElement('IMG');
    image.src = 'https://i.imgsafe.org/b8ff07eb90.png';
    image.style.float = 'left';
    image.style.marginRight = '15px';
    image.style.width = '27px';
    image.style.height = '27px';
    clone.id = "weeshBigButton0";
    clone.innerHTML = "Ajouter à Weesh";
    clone.appendChild(image);
    clone.style.backgroundColor = "purple";
    clone.addEventListener('click', function() {
            addUrlInList(document.location.href);
        }, false);
    pntNode.parentNode.appendChild(clone);
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function addUrlInList(link){
    var srcImg = document.getElementById('landingImage').src;
    var priceSend = document.getElementById('priceblock_ourprice').innerHTML;
    var nameSend = document.getElementById('landingImage').alt;
        
    chrome.runtime.sendMessage({method:'setItem',url:link,img:srcImg,price:priceSend,name:nameSend});
}


function addElementInList(id) {
    var res = id.substring(16);
    var link = listUrl[res];
    var srcImg = listImg[res];
    var priceSend = listPrices[res];
    var nameSend = listNames[res];
        
    chrome.runtime.sendMessage({method:'setItem',url:link,img:srcImg,price:priceSend,name:nameSend});
}
