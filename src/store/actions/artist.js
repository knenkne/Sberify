import * as types from '../action-types'

export const changeDrug = (payload) => (dispatch) => {
    dispatch({
        type: types.INIT_DRAG,
        isDragged: payload
    })
}