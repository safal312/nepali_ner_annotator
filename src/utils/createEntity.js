import React from "react"
import { v4 as uuidv4 } from 'uuid';

const findTextPosition = (parentEl, id, characters=0) => { 
    for (let i = 0; i< parentEl.childNodes.length; i++) {
        if (parentEl.childNodes[i].id === id) {
            let start = characters
            characters += parentEl.childNodes[i].textContent.length
            return [start, characters]
        }

        const nodes = parentEl.childNodes
        
        if (nodes[i].nodeName === "#text") {
            characters += nodes[i].length 
        } else if (nodes[i].nodeName==="SPAN"){
            if (nodes[i].querySelector(`[id=${id}]`) === null) {
                characters += nodes[i].textContent.length
            } else {
                return findTextPosition(nodes[i], id, characters)
            }
        }
    }

    return -1
}

const createEntity = (selection, activeTag, target) => {
    const range = selection.getRangeAt(0)

    const span = document.createElement("span")
    span.classList.add("entity", activeTag.value)

    // prefixing with activeTag value because CSS selectors can't start with integers
    const identifier = activeTag.value + uuidv4()
    span.id =  identifier

    const tagColor = activeTag.color
    span.style.backgroundColor = `hsla(${tagColor[0]}, ${tagColor[1]}%, ${tagColor[2]}%,0.7)`

    try {
        if (selection.toString() !== target.textContent) range.surroundContents(span)
    } catch (e) {
        // show an error popup
        console.log("The selected text is already tagged")
    }


    let characters = 0

    const position = [0, 0]

    //recursively find parent P
    let currNode = selection.anchorNode;
    
    while (currNode.nodeName !== "P") {
        currNode = currNode.parentNode
    }

    const nodes = currNode.childNodes
    console.log(findTextPosition(currNode, identifier, 0))
    // const [start, end] = findTextPosition(currNode, identifier, 0)
    // console.log(start, end)

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        let node_length = 0
        
        // console.log(node.getElementById(identifier))

        // if (node.id && node.id === identifier) {
        //     position[0] = characters
        //     position[1] = characters + node_length
        //     break
        // }

        // characters += node_length
    }

    // console.log(position)
    
    return {
        id: identifier,
        position
    }
}

export default createEntity