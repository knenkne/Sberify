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
        case types.DRAG_CHANGE: {
            const stateCopy = { ...state };
            stateCopy.isDragged = action.isDragged;

            return stateCopy

        }
        default: {
            return state
        }
    }
}
