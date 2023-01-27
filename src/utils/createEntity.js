import React from "react"
import { v4 as uuidv4 } from 'uuid';

const createEntity = (selection, activeTag, target) => {
    const range = selection.getRangeAt(0)

    const span = document.createElement("span")
    span.classList.add("entity", activeTag)

    const identifier = uuidv4()
    span.id = identifier

    try {
        range.surroundContents(span)
    } catch (e) {
        // show an error popup
        console.log("The selected text is already tagged")
    }

    let characters = 0
    console.log(selection)
    console.log(target)

    for (let i = 0; i < selection.anchorNode.childNodes.length; i++) {
        const node = selection.anchorNode.childNodes[i]
        if (node.id && node.id === identifier) break

        characters += node.nodeName === "#text" ? node.length : node.textContent.length
    }

    return [characters, characters + selection.toString().length]
}

export default createEntity