import React, { useContext} from 'react'
import { Radio, Input, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid';

import { NERContext } from '../context/NERContext';

const { Search } = Input

const Tags = () => {
    const { tags : allTags, activeTag, handleTag, setActiveTag } = useContext(NERContext)

    const onInputChange = (value) => {
        if (value === "" || value === null || value === undefined) return

        if (allTags.find(tag => tag.value === value)) return

        const hue = parseInt(Math.random() * 360)
        const sat = parseInt(Math.random() * 45) + 50
        const light = 60

        const id = uuidv4()

        const tag = {id, value, color: [hue, sat, light]}

        handleTag("add", tag)

        if (allTags.length === 0) {
            setActiveTag(tag)
        }
    }

    const onTagChange = (e) => {
        if (e.target.value === "" || e.target.value === null) return
        allTags.forEach(tag => {
            if (tag.value === e.target.value) {
                setActiveTag(tag)   
            } 
        })
    }

    const handleTagDelete = (e) => {
        let index;
        const filteredTags = allTags.filter((tag, i) => {
            const bool = tag.value !== activeTag.value
            if (!bool) index = i
            return bool
        })

        if (allTags.length >= 1) {
            setActiveTag(allTags.at(index-1))
        }

        handleTag("remove", filteredTags)
    }

  return (
    <div id="tagInput" className='textbox'>
        <Search
            style={{ display: 'block', minWidth: '15em', width: "30%", marginBottom: "1em" }}
            placeholder="Enter Tag Name"
            allowClear
            enterButton="Add"
            size="medium"
            onSearch={onInputChange}
        />
        {allTags.length > 0 && <div className='flex justify-between'>
            <div>Selected Tag: <span style={{color: `hsl(${activeTag.color[0]}, ${activeTag.color[1]}%, ${activeTag.color[2]}%)`}} >{activeTag.value}</span></div>
            <div>
                <Button onClick={handleTagDelete} type="primary" danger>
                    Delete
                </Button>
            </div>
        </div>}

        <Radio.Group buttonStyle="solid" className='textbox' onChange={onTagChange} value={activeTag.value}>
            {allTags.map(tag => {
                return <Radio.Button key={tag.id} value={tag.value}>{tag.value}</Radio.Button>
            })}
        </Radio.Group>
    </div>
  )
}

export default Tags