import axios from 'axios';

const BASE_URL = 'http://192.168.0.14:8000'


export const getAnswersID = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/question/answers?id=${id}`)
        return response.data
    } catch (err) {
        throw err
    }
}

export const addAnswer = async (ans) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/question/answer`, ans)
        return response.data
    } catch (err) {
        throw err
    }
}