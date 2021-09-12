import axios from 'axios'

class AutoTest {
    constructor(dataHook, user) {
        this.dataHook = dataHook;
        this.axios = axios.create();
        this.user = user
        this.baseUrl = window && location.origin
        this.startSession()
    }

    startSession() {
        this.session = mongoObjectId();
        this.createFlow()
        setupTimers(this.startSession.bind(this), 4 * Math.pow(10, 4))
    }

    createFlow() {
        this.axios.post(this.dataHook, this.envelope(
            'flow',
            'create',
            {
                _id: this.session,
                baseUrl: this.baseUrl
            }
        ))
    }

    init(dataHook) {
        if (!localStorage.getItem('autotest_user_id')) {
            localStorage.setItem('autotest_user_id', mongoObjectId())
        }
        return new AutoTest(dataHook, localStorage.getItem('autotest_user_id'));
    }

    envelope(type, method, body) {
        return {
            type,
            method,
            body
        }
    }

    handleRequest(req) {

    }


    handleResponse(res) {

    }

    record(axiosInstance) {
        if (axiosInstance && axiosInstance.interceptors) {
            axiosInstance.interceptors.request.use(this.handleRequest.bind(this))
            axiosInstance.interceptors.response.use(this.handleResponse.bind(this))
        }
    }

}

var mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};


function resetTimer(doInactive, timeoutInMiliseconds) {
    return function (timeoutId) {
        window.clearTimeout(timeoutId)
        setTimeout(() => startTimer(doInactive, timeoutInMiliseconds), 0)
    }
}

function setupTimers(doInactive, timeoutInMiliseconds) {
    let timerId
    restTimerConfiged = resetTimer(doInactive, timeoutInMiliseconds)
    document.addEventListener("mousemove", () => restTimerConfiged(timerId), false);
    document.addEventListener("mousedown", () => restTimerConfiged(timerId), false);
    document.addEventListener("keypress", () => restTimerConfiged(timerId), false);
    document.addEventListener("touchmove", () => restTimerConfiged(timerId), false);

    timerId = window.setTimeout(doInactive, timeoutInMiliseconds)
}

export default new AutoTest()
