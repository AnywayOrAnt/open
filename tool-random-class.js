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