import axios from 'axios';

const BASE_URL = 'http://192.168.0.14:8000'

export const retrieveQuestionTemplate = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/feeds/questions_template/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getstatus = async () => {
    try {
       await axios.get(`${BASE_URL}/api/feeds/questions/`)
    } catch (err) {
        throw err
    }
}

export const postQuestion = async (question) => {
    
    try {
       await axios.post(`${BASE_URL}/api/feeds/add_your_question`, question)
    } catch (err) {
        throw err;
    }
}

export const removeQuestion = async (id) => {
    try {
       await axios.delete(`${BASE_URL}/api/feeds/questions/rm/`,{params: {id}})
    } catch (err) {
        throw err
    }
}

export const editQuestion = async (id, question) => {
    delete question["updated_at"]
    delete question["comments_count"]    
    try {
       await axios.put(`${BASE_URL}/api/feeds/questions/edit/?id=${id}`, {...question});
    } catch (err) {
        throw err;
    }
};