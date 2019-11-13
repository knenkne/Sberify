import * as types from '../action-types'

const defaultState = {
    data: {
        name: "",
        description: "",
        socials: {
            twitter: "",
            facebook: "",
            instagram: ""
        },
        albums: [],
        video: ""
    },
    isDragged: false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.INIT_DRAG: {
            return {
                ...state,
                isDragged: action.isDragged
            }
        }
        default: {
            return state
        }
    }
}
