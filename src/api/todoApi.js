import axiosClient from './axiosClient';

export const todoApi = {

    get: (data) => {
        const url = '/todos/get';
        return axiosClient.post(url, data);
    },
    getPassedNotes: (data) => {
        const url = '/todos/getPassed'
        return axiosClient.post(url, data);
    },
    add: (data) => {
        const url = '/todos/add';
        return axiosClient.post(url, data)
    },
    changeState: (data) => {
        const url = '/todos/changeState';
        return axiosClient.post(url, data)
    },
    addTodo: (data) => {
        const url = '/todos/addTodo';
        return axiosClient.post(url, data);
    },
    delete: (data) => {
        // console.log(`[api data]`, data);
        const url = '/todos/delete';
        return axiosClient.delete(url, { data });
    },
    deleteMulti: (data) => {
        const url = '/todos/deleteMulti';
        return axiosClient.delete(url, { data });
    },
    deleteTodo: (data) => {
        const url = '/todos/deleteTodo';
        return axiosClient.delete(url, { data });
    },

    // data: {groupId, search}
    search: (data) => {
        const url = '/todos/search';
        return axiosClient.post(url, data);
    }

}
