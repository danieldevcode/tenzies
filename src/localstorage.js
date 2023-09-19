export {saveLocal, getLocal, removeLocal, removeAllLocal}

function saveLocal(key, value){
    const stringifiedValue =JSON.stringify(value)
    localStorage.setItem(key, stringifiedValue)
}

function getLocal(key){
    return JSON.parse(localStorage.getItem(key))
}

function removeLocal(key){
    localStorage.removeItem(key)
}

function removeAllLocal(){
    localStorage.clear();
}