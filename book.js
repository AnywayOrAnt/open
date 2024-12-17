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
            (new String(h).startsWith("<")) && (
                !(new String(h).startsWith("<%")) &&
                !(new String(h).startsWith("<?"))
            )
            
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

function windowLoad() {
    textarea2div();
    fnSavePage();
}

function fnSavePage (){
    let saveKey = document.body.getAttribute("data-save-key");
    let stints = document.querySelectorAll("body>*>*");

    let h1 = document.createElement("h1");
    document.body.appendChild(h1);
    h1.innerHTML = "clear save";
    h1.classList.add("clear-save");
    h1.style.position = "fixed";
    h1.style.right = 0;
    h1.style.bottom = 0;

    stints.forEach((ele, index)=>{
        ele.saveIndex = index;
    });

    if(saveKey){
        let current = localStorage.getItem(saveKey)*1;

        if(current>0){
            fnSavePageUpdate(stints, current);
        }

        stints.forEach((ele, index)=>{
            ele.addEventListener("dblclick", (event)=>{
                localStorage.setItem(saveKey, index);
                event.stopPropagation();
                fnSavePageUpdate(stints, index);
            });
        });

        h1.addEventListener("dblclick", (event)=>{
            event.stopPropagation();
            event.preventDefault();
            let saveKey = document.body.getAttribute("data-save-key");
            localStorage.removeItem(saveKey);
            location.reload();
        });
    }
}

function fnSavePageUpdate(elements, current){
    elements.forEach((ea, i)=>{
        if(i < current){
            ea.classList.add("d-none");
        }
    });
}

window.onload = windowLoad;