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
    cursor: {
        isDragged: false,
        x: 0
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.DRAG_CHANGE: {
            const stateCopy = { ...state };
            console.log(state)
            stateCopy.cursor.isDragged = action.isDragged;
            if (action.x) {
                stateCopy.cursor.x = action.x
            }

            return stateCopy
        }

        default: {
            return state
        }
    }
}
