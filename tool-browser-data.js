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