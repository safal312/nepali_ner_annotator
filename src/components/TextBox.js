import React, { useState } from 'react'

import createEntity from '../utils/createEntity'

const TextBox = () => {
    const [activeTag, setActiveTag] = useState("name")
    const [entities, setEntities] = useState([])
    const [text, setText] = useState(`PIZZA FRITTA 😍😍
    .
    Famous Italian Street Food. Fried pizza 🍕
    HIGHLY RECOMMENDED 👍
    🌟 FORZA, Mandala Street Thamel
    📍Inside Mandala Street
    💰Rs. 390/-
    ®️Rating: 8.5/10
    #mrfoodienepal #stayhungry #lifeisbeautiful #damidamidami 👌`)

    const selectWord = (e) => {
        const selection = window.getSelection()

        if (selection.toString() == "") return

        if (selection.anchorOffset === selection.extentOffset) return

        const indices = createEntity(selection, activeTag, e.target)
        console.log("Slice:", text.slice(indices[0], indices[1]))

        const selectedText = selection.anchorOffset < selection.extentOffset ? text.slice(selection.anchorOffset, selection.extentOffset) : text.slice(selection.extentOffset, selection.anchorOffset)
        const cleanText = selectedText.replace(/(\r\n|\n|\r)/gm, "").replace(/ +(?= )/g, '');;

        // console.log(text.slice(0, selection.anchorOffset))
        // console.log(text.slice(selection.anchorOffset, selection.extentOffset))
        // console.log(text.slice(selection.extentOffset))


    }

    return (
        <div onMouseUp={selectWord}>
            <p className="textbox border-2 p-3 text-xl">
                {text}
            </p>
        </div>
    )
}

export default TextBox