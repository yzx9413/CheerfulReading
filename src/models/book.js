
export default {
    namespace: 'book',
    state: {
        list: [],
    },

    effects: {
        *getBooksList({ payload }, { call, put }) {
            const response = yield call(() => {
                return fetch(`http://123.206.55.50:15000/shop/list`).then(response => response.json()).then(body => body)
            })
            if (response.code == 1) {
                yield put({
                    type: 'getList', payload: response
                })
            }
        }
    },

    reducers: {
        getList(state, { payload }) {
            return {
                ...state,
                list: payload,
            };
        }
    }
};
