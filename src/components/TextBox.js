import React, { useState, useContext } from 'react'

import { NERContext } from '../context/NERContext'
import createEntity from '../utils/createEntity'

const TextBox = () => {
    const { tags : allTags, activeTag, handleTag, setActiveTag } = useContext(NERContext)

    // const [activeTag, setActiveTag] = useState("name")
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
    // const cleanText = text.replace(/(\r\n|\n|\r)/gm, "").replace(/ +(?= )/g, '');;
    const selectWord = (e) => {
        const selection = window.getSelection()

        if (selection.toString() === "") return

        if (selection.anchorOffset === selection.extentOffset) return

        if (allTags.length === 0) {
            console.log("Create Tags First")
            return
            // send an error
        }

        const entity = createEntity(selection, activeTag, e.target)
        // console.log(entity)
        // console.log("Slice:", text.slice(entity.position[0], entity.position[1]))

        const selectedText = selection.anchorOffset < selection.extentOffset ? text.slice(selection.anchorOffset, selection.extentOffset) : text.slice(selection.extentOffset, selection.anchorOffset)

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