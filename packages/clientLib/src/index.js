import axios from 'axios'

class AutoTest {
    constructor(dataHook, user) {
        this.dataHook = dataHook;
        this.axios = axios.create();
        this.user = user
        this.baseUrl = window && location.origin
    }

    startSession() {
        this.session = mongoObjectId();
        this.createFlow()
        onInactive(this.startSession.bind(this), 4 * Math.pow(10, 4))
        return this
    }

    createFlow() {
        this.axios.post(this.dataHook, this.envelope(
            'flow',
            'create',
            {
                _id: this.session,
                baseUrl: this.baseUrl,
                user: this.user
            }
        )).catch(console.log)
    }

    createSequenceWithRequest(req) {
        const _id = mongoObjectId();
        this.axios.post(this.dataHook, this.envelope(
            'sequence',
            'create',
            {
                _id,
                flowId: this.session,
                location: window && location.pathname,
                endpoint: req.url,
                timestamp: new Date().getTime(),
                request: req
            }
        )).catch(console.log)

        req.headers['x-autotest-sequence-id'] = _id

        return req
    }

    updateSequenceWithResponse(res) {
        const sequenceId = res.config.headers['x-autotest-sequence-id']
        this.axios.post(this.dataHook, this.envelope(
            'sequence',
            'update',
            {
                response: res
            },
            {
                _id: sequenceId
            }
        )).catch(console.log)
        return res;
    }

    init(dataHook) {
        if (!localStorage.getItem('autotest_user_id')) {
            localStorage.setItem('autotest_user_id', mongoObjectId())
        }
        return new AutoTest(dataHook, localStorage.getItem('autotest_user_id')).startSession()
    }

    envelope(type, method, body, params) {
        return {
            type,
            method,
            body,
            params
        }
    }

    handleRequest(...args) {
        return this.createSequenceWithRequest(...args);
    }

    handleResponse(...args) {
        return this.updateSequenceWithResponse(...args);
    }

    record(axiosInstance) {
        const req = this.handleRequest.bind(this);
        const res = this.handleResponse.bind(this)
        if (axiosInstance && axiosInstance.interceptors) {
            axiosInstance.interceptors.request.use(req, (...args) => Promise.reject(req(...args)))
            axiosInstance.interceptors.response.use(res, (...args) => Promise.reject(res(...args)))
        }
    }

}

var mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};


function onInactive(cb, ms) {

    let wait = setTimeout(cb, ms);
    document.onmousemove = document.mousedown = document.mouseup = document.onkeydown = document.onkeyup = document.focus = function () {
        clearTimeout(wait);
        wait = setTimeout(cb, ms);
    };
}

export default new AutoTest()
