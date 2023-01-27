import React from "react"

const createEntity = (selection) => {
    let ranges = []
    for (let i = 0; i < selection.rangeCount; i++) {
        ranges[i] = selection.getRangeAt(i);
    }
    console.log(ranges)
    const range = selection.getRangeAt(0)
    const span = document.createElement("span")

    span.style.backgroundColor = "yellow"
    range.surroundContents(span)
}

export default createEntity