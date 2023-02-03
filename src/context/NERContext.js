import React, { createContext, useReducer } from 'react'
import reducer from '../store/reducer'
import initialState from '../store/initialState'
import ACTIONS from '../store/actions'

export const NERContext = createContext(initialState)

export const NERProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleTag = (type, data) => {
        if (type === "add") {
            dispatch({
                type: ACTIONS.ADD_TAG,
                payload: data
            })
        } else if (type === "remove") {
            dispatch({
                type: ACTIONS.REMOVE_TAG,
                payload: data
            })
        }
    }

    const setActiveTag = (tag) => {
        dispatch({
            type: ACTIONS.CHANGE_TAG,
            payload: tag
        })
    } 

    return (
        <NERContext.Provider value={{
            tags: state.tags,
            activeTag: state.activeTag,
            handleTag,
            setActiveTag
        }}>
            {children}
        </NERContext.Provider>
    )
}