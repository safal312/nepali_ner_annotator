import ACTIONS from "./actions"

const reducer = (state, action) => {
    switch (action.type){
        case ACTIONS.ADD_TAG:
            return {
                ...state,
                tags: [...state.tags, action.payload]
            }

        case ACTIONS.REMOVE_TAG:
            return {
                ...state,
                tags: action.payload
            }
        
        case ACTIONS.CHANGE_TAG:
            return {
                ...state,
                activeTag: action.payload
            }
    
        default:
            console.log('No action mapped')
            return state
    }
}

export default reducer