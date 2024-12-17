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
    document.body.save = true;
    textarea2div();
    fnSavePage();
}

let fnSavePage = ()=>{
    let saveKey = document.body.getAttribute("data-save-key");
    let stints = document.querySelectorAll("body>*>*");
    stints.forEach((ele, index)=>{
        ele.saveIndex = index;
    });

    if(saveKey){
        let current = localStorage.getItem(saveKey)*1;

        if(current>0){
            stints.forEach((stint, idx)=>{
                if(idx < current){
                    stint.classList.add("d-none");
                }
            });
        }

        stints.forEach((ele, index)=>{
            ele.addEventListener("dblclick", (event)=>{
                localStorage.setItem(saveKey, index);
                event.stopPropagation();
                // console.log(event.target);
                stints.forEach((ea, i)=>{
                    // console.log(i, ele.saveIndex);
                    if(i < ele.saveIndex){
                        ea.classList.add("d-none");
                    }
                });
            });
        });
    }
}

window.onload = windowLoad;