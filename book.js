if(!BREAK){
    var BREAK = "■■■■■■■■";
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

window.addEventListener("DOMContentLoaded", function (event) {
    document.querySelectorAll("textarea").forEach(function (e, i) {
        let n = e.nodeName.toLowerCase();
        let c = e.className.trim();
        h = e.textContent.trim();
        let p = e.parentNode;
        let q = document.createElement("div");
        q.textContent = h;
        p.insertBefore(q, e);
        p.removeChild(e);

        if(c == ""){
            q.classList.add("code");
        }
    });
});

function makeData4table(){

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
    console.log(string);

    for(let i=0, len=string.length; i<len; i++){
        console.log(alpha[string[i]]);
        string[i] = alpha[string[i]] || 0;
    }
    
    return string.join("");
}