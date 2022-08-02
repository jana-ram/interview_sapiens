const loadHeader = () =>{
    var userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
    return {
        "Content-Type" : "application/json",
        "Authorization" : `bearer ${userData ? userData['token'] : ''}`
    }
}
export const removeLS = () =>{
    localStorage.removeItem("userData");
}
export const getUserLS = () =>{
    let info = localStorage.getItem('userData')
    return  info ? JSON.parse(info) : null;
}
export const getThemeLS= () =>{
    return localStorage.getItem('theme') || null;
}
export const updateThemeLS = theme =>{
    localStorage.setItem('theme',theme);
}
export const api = obj =>{
    try {
        const {
            url,
            data,
            method
        } = obj;
        return new Promise((resolve,reject) =>{
            fetch(
                url,
                {
                    method,
                    headers : loadHeader(),
                    body : JSON.stringify(data)
                }
            ).then(res=>resolve(res.json()))
        });
    } catch(e){
        console.log(e)
    }
}