import axios from 'axios'
import _ from 'lodash'
import autoTstConfig from '@autotest/config'

const createSequence = async (data) => {
    return axios
        .post(`${autoTstConfig.get('FLOW_SERVICE')}/sequence`, data)
        .then(res => _.get(res, 'data'))
}

const getSequenceById = async (id) => {
    return axios
        .get(`${autoTstConfig.get('FLOW_SERVICE')}/sequence/${id}`)
        .then(res => _.get(res, 'data'))
}

const updateSequenceById = async ({ _id, ...data }) => {
    return axios
        .put(`${autoTstConfig.get('FLOW_SERVICE')}/sequence/${_id}`, data)
        .then(res => _.get(res, 'data'))
}


export default {
    createSequence,
    getSequenceById,
    updateSequenceById
}