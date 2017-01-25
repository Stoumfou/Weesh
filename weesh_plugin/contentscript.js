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
    var a = document.getElementsByClassName('a-size-base a-color-price a-text-bold');
    var b = document.getElementsByClassName('a-size-base a-color-price s-price a-text-bold');
    var c = document.getElementById('submit.add-to-cart-announce');
    
    amazonPutButton();
    //Google search
    //var b = document.getElementsByClassName('_QD _pvi');
    

    //if(a!=null) addManyButtons(a);
    //if(b!=null) addManyButtons(b);
    //if(c!=null) addBigButton(c);
}

function amazonPutButton(){
    listImg=[];
    listNames=[];
    listUrl=[];
    listPrices=[];
    
    var count = document.getElementById('s-results-list-atf').children.length;
    var listLi = document.getElementById('s-results-list-atf').getElementsByTagName('li');
    
    
    
    for(var i = 0 ; listImg.length < count ; i++) {
        //if(typeof listLi[i].getElementsByTagName('img')[0] == "undefined") continue;
        
        console.log(listLi[i].getElementsByTagName('img'));
        if(typeof listLi[i].getElementsByTagName('img')[0] != "undefined") listImg.push(listLi[i].getElementsByTagName('img')[0].src);
        if(typeof listLi[i].getElementsByTagName('h2')[0] != "undefined") listNames.push(listLi[i].getElementsByTagName('h2')[0].innerHTML);
        if(typeof listLi[i].getElementsByTagName('a')[0] != "undefined") listUrl.push(listLi[i].getElementsByTagName('a')[0].href);
        if(typeof listLi[i].getElementsByClassName('a-size-base a-color-price a-text-bold')[0] != "undefined") listPrices.push(listLi[i].getElementsByClassName('a-size-base a-color-price a-text-bold')[0].innerHTML);
        
        if(typeof listLi[i].getElementsByClassName('a-size-base a-color-price a-text-bold')[0] != "undefined") addButton(listImg.length-1,listLi[i].getElementsByClassName('a-size-base a-color-price a-text-bold')[0]);
    }
    
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
    console.log("stop?");
    chrome.runtime.sendMessage({method:'setTitle',title:link});
}


function addElementInList(id) {
    var res = id.substring(16);
    var link = listUrl[res];
    var srcImg = listImg[res];
    var priceSend = listPrices[res];
    var nameSend = listNames[res];
    
    /*
    var contains = '/gp/slredirect/';

    if (link.includes(contains)) {
        link = 'https://www.amazon.fr/'+link;
    }*/
        
    chrome.runtime.sendMessage({method:'setItem',url:link,img:srcImg,price:priceSend,name:nameSend});
}
