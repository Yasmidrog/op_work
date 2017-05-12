export function checkErr({json, response}){
    if (response.ok === false) {
        return Promise.reject(json)
    }
    return json
}