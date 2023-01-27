import React from "react"
import { v4 as uuidv4 } from 'uuid';

const createEntity = (selection, activeTag) => {
    const range = selection.getRangeAt(0)
    const span = document.createElement("span")
    span.classList.add("entity", activeTag)

    const identifier = uuidv4()
    span.id = identifier

    range.surroundContents(span)
}

export default createEntity