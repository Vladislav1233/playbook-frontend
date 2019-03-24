import { 
    GET_TRAINER_LIST_START, 
    GET_TRAINER_LIST_SUCCESS, 
    GET_TRAINER_LIST_FAILURE,

    CLEAR_TRAINER_LIST_STORE
} from '../constants/trainerList';

const initialState = {
    listTrainer: [],
    preloader: false,
    pagination: {
        limit: 12,
        offset: 0
    },
    total_count: 0
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TRAINER_LIST_START:
            return {
                ...state,
                preloader: true
            }

        case GET_TRAINER_LIST_SUCCESS:
            const { list, total_count } = action.payload.data.data;
            const { config } = action.payload;

            if (list.length > 0) {
                const newListTrainer = [...state.listTrainer, ...list];

                return {
                    ...state,
                    preloader: false,
                    pagination: {
                        ...state.pagination,
                        offset: config.params.offset + state.pagination.limit
                    },
                    listTrainer: newListTrainer,
                    total_count: total_count
                }
            } else {
                return {
                    ...initialState
                }
            }

        case GET_TRAINER_LIST_FAILURE:
            alert('ошибка'); // TODO
            return {
                ...state,
                preloader: false
            }
        
        case CLEAR_TRAINER_LIST_STORE:
            return {
                ...initialState
            }

        default:
            return {
                ...state
            }
    }
}