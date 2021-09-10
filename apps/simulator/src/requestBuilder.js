
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const methods = ['GET', 'PUT', 'POST'];
const endpoints = [
    '/add',
    '/sub',
    '/mul',
    '/div'
]


export default function getRequest() {
    let payload;
    const method = methods[randomIntFromInterval(0, 2)]
    let endpoint = endpoints[randomIntFromInterval(0, 3)]
    if (method !== 'POST') {
        endpoint = `${endpoint}/${randomIntFromInterval(1, 9)}`
    }

    if (method !== 'GET') {
        payload = {
            a: randomIntFromInterval(0, 100),
            b: randomIntFromInterval(0, 100)
        }
    }

    return {
        method,
        endpoint,
        payload
    }
}