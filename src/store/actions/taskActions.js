import { TASK_REQUEST, TASK_SUCCESS, TASK_FAILURE } from '../types'

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

export const taskRequest = () => ({
    type: TASK_REQUEST,
})

export const taskSuccess = (data) => ({
    type: TASK_SUCCESS,
    payload: data,
})

export const taskFailure = (error) => ({
    type: TASK_FAILURE,
    payload: error,
})

export const getTask = (path) => dispatch => {
    dispatch(taskRequest())
    fetch(`${API_ENDPOINT}/task/${path}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(data => dispatch(taskSuccess(data.result)))
        .catch(error => dispatch(taskFailure(error)))
}