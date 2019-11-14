import * as types from '../action-types'

export const changeDrag = (payload) => (dispatch) => {
    dispatch({
        type: types.DRAG_CHANGE,
        isDragged: payload
    })
}