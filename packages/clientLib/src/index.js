//import axios from axios

class AutoTest {
    constructor(dataHook) {
        this.dataHook = dataHook;
    }

    init(dataHook) {
        return new AutoTest(dataHook);
    }

    record(axiosInstance) {
        //Todo
    }

}

export default new AutoTest()
