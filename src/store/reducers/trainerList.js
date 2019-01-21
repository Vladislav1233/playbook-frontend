import { 
    GET_TRAINER_LIST_START, 
    GET_TRAINER_LIST_SUCCESS, 
    GET_TRAINER_LIST_FAILURE 
} from '../constants/trainerList';

const initialState = {
    listTrainer: [],
    params: null,
    preloader: false,
    pagination: {
        limit: 4,
        offset: 0
    },
    hideMoreButton: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TRAINER_LIST_START:
            return {
                ...state,
                preloader: true
            }

        case GET_TRAINER_LIST_SUCCESS:
            if (action.payload.data.data.length > 0) {
                const { config, data } = action.payload;
                const newListTrainer = [...state.listTrainer, ...data.data];

                return {
                    ...state,
                    preloader: false,
                    pagination: {
                        ...state.pagination,
                        offset: config.params.offset + state.pagination.limit
                    },
                    listTrainer: newListTrainer
                }
            } else {
                return {
                    ...state,
                    hideMoreButton: true
                }
            }

        case GET_TRAINER_LIST_FAILURE:
            alert('ошибка'); // TODO
            return {
                ...state,
                preloader: false
            }

        default:
            return {
                ...state
            }
    }
};