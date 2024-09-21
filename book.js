if(!window.BREAK){
    window.BREAK = "■■■■■■■■";
}

function text2arr(text){
    return text.trim().replace(/<br>/g, BREAK).replace(/</g, "&lt;").replace(/>/g, "&gt;").split("\n");
}

function arr2tbody(tbodySelector, text_2d_Array){
    let arr = [];
    for(let i=0, iLen = text_2d_Array[0].length; i<iLen; i++){
        let temp = [];
        for(let j=0, jLen = text_2d_Array.length; j< jLen; j++){
            let current = (text_2d_Array[j][i] || "XXXXXX").trim(); 
            current = "<td>" + current + "</td>";
            current = current.replaceAll(BREAK, "<br>")
            temp.push([current]);
        }
        arr.push("<tr>" + temp.join("\n") + "</tr>");
    }
    arr = arr.join("\n");
    let tbody = document.querySelector(tbodySelector);
    tbody.innerHTML = arr;
}

function textarea2div(){
    document
        .querySelectorAll("textarea")
        .forEach(function (e, i) {

        let n = e.nodeName.toLowerCase(),
            c = e.className.trim(),
            p = e.parentNode,
            q = document.createElement("div");

        h = e.textContent.trim();
        
        if(
            // (new String(h).startsWith("<style")) ||
            // (new String(h).startsWith("<!DOCTYPE html>")) ||
            // (new String(h).startsWith("<script"))

            new String(h).startsWith("<") &&
            !(new String(h).startsWith("<%"))
        ){
            h = "    " + h
        }

        q.textContent = h;
        p.insertBefore(q, e);
        p.removeChild(e);

        if(c == ""){
            q.classList.add("code");
        } else {
            q.className = c;
            q.classList.add("pre-wrap");
        }
    });
}

function makeDataFromtable(){
    let dataRows = document.querySelector("table>tbody>tr");
    let arrData = [];
    let colors = ["red", "blue", "yellow","green", "white", "purple", "orange", "brown", "pink"];
    for(let i=0, len=dataRows.lengthh; i<len; i++){
        let current = dataRows[i];
        let kugiri = i == len-1? "":",";
        let row = `Arrays.asList("${current[0].textContent}, ${current[1].textContent}, ${current[2].textContent}, "${current.className}")${kugiri}`;
        arrData.push(row);
    }
    return arrData.join("\n");
}

function converTo2digits(number) {
    number = number*1;
    number = number<10? "0" + number: number;
    return number;
}

function randomClass(upperOrLowerCase) {
    let alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    let now = new Date();
    let year = now.getFullYear() % 2000;
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let arr = [year, month, date, hours, minutes, seconds];
    
    for(let i=0, len=arr.length; i<len; i++){
        arr[i] = converTo2digits(arr[i]);
    };
    
    arr = arr.join("").split("");

    for(let i=0, len=arr.length; i<len; i++){
        arr[i] = alpha[arr[i]];
    }

    arr = arr.join("");
    arr = upperOrLowerCase == true? arr.toUpperCase() : arr;

    return arr;
}

function decodeAlphabets(string) {
    let tem = [];
    let alpha = {
        a:0,
        b:1,
        c:2,
        d:3,
        e:4,
        f:5,
        g:6,
        h:7,
        i:9
    }

    string = string.toLowerCase().split("");

    for(let i=0, len=string.length; i<len; i++){
        console.log(alpha[string[i]]);
        string[i] = alpha[string[i]] || 0;
    }
    
    return string.join("");
}

function obj2list(obj) {
    obj.parent = document.querySelector(obj.parent);

    if(!obj.parent){
        return false;
    }

    obj.nodeName = obj.parent.nodeName.toLowerCase();

    if(!obj.listStyleType){
        if(obj.nodeName == "ul"){
            obj.listStyleType = "space-counter";
        } else if(obj.nodeName == "ol"){
            obj.listStyleType = "cjk-earthly-branch";
        }
    }

    if(!obj.start){
        obj.start = 1;
    }

    obj.parent.style.listStyleType = obj.listStyleType;
    obj.parent.setAttribute("start", obj.start);

    for(let i = 0, len = obj.arr.length; i < len; i++){
        let current = obj.arr[i];
        let li = document.createElement("li");
        li.innerHTML = current;
        obj.parent.appendChild(li);
    }    
}

function changeTitle(arr, delimiter) {
    delimiter = delimiter || " | ";
    delimiter = arr.join(delimiter);
    document.title = delimiter;
}

function getPageKey(){
    let now = new Date();
    let nowString = "key" + [
        now.getFullYear(),
        // now.getMonth() + 1,
        // now.getDate(),
        // now.getHours(),
        // now.getMinutes(),
        // now.getSeconds()
    ].join("_");
    let key = document.body.getAttribute("data-current-page") || nowString;
    return key;
}

function getCurrentPage(){
    let key = getPageKey();
    let page = localStorage.getItem(key)*1;
    return page;
}

function getChapters() {
    return document.querySelectorAll("body>main");
}

function getBrowserData(dataType) {
    dataType = dataType || "array";
    let width = window.innerWidth,
        height = window.innerHeight,
        agent = navigator.userAgent;

    if(dataType === "arr"){
        return [
            width,
            height,
            agent
        ];
    } else if (dataType === "obj"){
        return {
            width: width,
            height: height,
            agent: agent
        }
    }
}

function getAllHeaders() {
    return document.querySelectorAll("h1, h2, h3, h4, h5, h6");
}

function windowLoad() {
    textarea2div();

    let chapters = getChapters(),
        pageKey = getPageKey(),
        currentPage = getCurrentPage();
    
    document.title = currentPage + 1 + " | " + pageKey;
    document.body.setAttribute(
        "data-browser", 
        getBrowserData("arr").join(" | ")
    );

    if(currentPage >= chapters.length){
        currentPage = 0;
    }
    
    chapters.forEach(function (ele, i) {
        ele.style.display = i == currentPage? "block":"none";
    });

    chapters.length > 0 && getAllHeaders().forEach(function (ele) {
        ele.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            event.stopPropagation();
            
            let chap = prompt("chapter");
            if(!isNaN(chap * 1)){
                chap = chap*1 - 1;
                chap = chap < 0? 0 : chap;
            }

            if(chap >= chapters.length){
                chap = currentPage;
            }
            console.log(pageKey, chap);
            localStorage.setItem(pageKey, chap);
            document.title = chap + 1 + " | " + pageKey;
            
            chapters.forEach(function (ele, i) {
                let act = i == chap? "block":"none";
                ele.style.display = act;
            }); 
        });
    });
}