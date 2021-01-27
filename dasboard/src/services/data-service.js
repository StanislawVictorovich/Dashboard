import axios from 'axios';
import { ALL_USERS, SERVER_URL } from '../constants';
class DataService {
    getUsers() {
        return axios
            .get(`${SERVER_URL}/users`);
    }
    getPosts(userId) {
        const param = userId !== ALL_USERS
            ? `?userId=${userId}`
            : '';
        return axios
            .get(`${SERVER_URL}/posts/${param}`);
    }
    getComments(postId) {
        const param = postId
            ? `?postId=${postId}`
            : '';
        return axios
            .get(`${SERVER_URL}/comments/${param}`);
    }
}

export default new DataService;
