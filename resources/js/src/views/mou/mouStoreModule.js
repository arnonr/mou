import axios from "@axios";

export default {
    namespaced: true,
    // state: {
    //     year: {
    //         id: 3,
    //         name: "2566",
    //     },
    // },
    getters: {},
    // mutations: {
    //     SET_YEAR(state, val) {
    //         state.year = val;
    //     },
    // },
    actions: {
        fetchMous(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get("/mou", { params: queryParams })
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
            });
        },
        fetchMou(ctx, { id }) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/mou/${id}`)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
            });
        },
        addMou(ctx, dataSend) {
            var form_data = new FormData();

            for (var key in dataSend) {
                form_data.append(key, dataSend[key]);
            }

            return new Promise((resolve, reject) => {
                axios
                    .post("/mou", form_data, {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    })
                    .then((response) => {
                        return resolve(response);
                    })
                    .catch((error) => reject(error));
            });
        },

        editMou(ctx, dataSend) {
            var form_data = new FormData();

            for (var key in dataSend) {
                form_data.append(key, dataSend[key]);
            }

            form_data.append("_method", "PUT");

            return new Promise((resolve, reject) => {
                axios
                    .post(`/mou/${dataSend.mou_id}`, form_data, {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    })
                    .then((response) => {
                        return resolve(response);
                    })
                    .catch((error) => reject(error));
            });
        },

        deleteMou(ctx, { id }) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`/mou/${id}`)
                    .then((response) => {
                        return resolve(response);
                    })
                    .catch((error) => reject(error));
            });
        },

        fetchHosts(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get("/host", { params: queryParams })
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
            });
        },

        fetchCountries(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get("/country", { params: queryParams })
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
            });
        },
    },
};
