import axios from 'axios'
import _ from 'lodash'
import autoTstConfig from '@autotest/config'

const createFlow = async (data) => {
    return axios
        .post(`${autoTstConfig.get('FLOW_SERVICE')}/flow`, data)
        .then(res => _.get(res, 'data'))
}

const getFlowById = async (id) => {
    return axios
        .get(`${autoTstConfig.get('FLOW_SERVICE')}/flow/${id}`)
        .then(res => _.get(res, 'data'))
}


export default {
    createFlow,
    getFlowById
}