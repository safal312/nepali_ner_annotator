import React from "react"
import { v4 as uuidv4 } from 'uuid';

const createEntity = (selection, activeTag, target) => {
    const range = selection.getRangeAt(0)

    const span = document.createElement("span")
    span.classList.add("entity", activeTag)

    const identifier = uuidv4()
    span.id = identifier
    // span.style.backgroundColor = `hsl(${hue}, ${sat}, ${light})`

    try {
        range.surroundContents(span)
    } catch (e) {
        // show an error popup
        console.log("The selected text is already tagged")
    }

    let characters = 0
    console.log(selection)
    console.log(target)

    const position = [0, 0]

    for (let i = 0; i < selection.anchorNode.childNodes.length; i++) {
        const node = selection.anchorNode.childNodes[i]
        const node_length = node.nodeName === "#text" ? node.length : node.textContent.length

        if (node.id && node.id === identifier) {
            position[0] = characters
            position[1] = characters + node_length
            break
        }

        characters += node_length
    }

    console.log(position)

    return {
        id: identifier,
        position
    }
}

export default createEntity