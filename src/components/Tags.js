import React, {useState} from 'react'
import { Radio, Input, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid';

const { Search } = Input

const Tags = () => {
    const [tagValue, setTagValue] = useState("")
    const [tags, setTags] = useState([])

    const onInputChange = (value) => {
        if (value === "" || value === null || value === undefined) return
        if (tags.includes(value)) return

        const hue = parseInt(Math.random() * 360)
        const sat = parseInt(Math.random() * 45) + 50
        const light = 60

        const id = uuidv4()

        const tag = {id, value, color: [hue, sat, light]}
        console.log(tags)
        setTags([...tags, tag])
        if (tags.length === 0) {
            setTagValue(tag)
        }
    }

    const onTagChange = (e) => {
        if (e.target.value === "" || e.target.value === null) return
        tags.forEach(tag => {
            if (tag.value === e.target.value) {
                setTagValue(tag)
            } 
        })
    }

    const handleTagDelete = (e) => {
        let index;
        const filteredTags = tags.filter((tag, i) => {
            const bool = tag.value !== tagValue.value
            if (!bool) index = i
            return bool
        })

        if (tags.length >= 1) {
            setTagValue(tags.at(index-1))
        }
        setTags(filteredTags)
    }

  return (
    <div id="tagInput" className='textbox'>
        <Search
            style={{ display: 'block', minWidth: '10em', width: "30%", marginBottom: "1em" }}
            placeholder="Enter Tag Name"
            allowClear
            enterButton="Add"
            size="medium"
            onSearch={onInputChange}
        />
        {tags.length > 0 && <div className='flex justify-between'>
            <div>Selected Tag: <span style={{color: `hsl(${tagValue.color[0]}, ${tagValue.color[1]}%, ${tagValue.color[2]}%)`}} >{tagValue.value}</span></div>
            <div>
                <Button onClick={handleTagDelete} type="primary" danger>
                    Delete
                </Button>
            </div>
        </div>}

        <Radio.Group buttonStyle="solid" className='textbox' onChange={onTagChange} value={tagValue.value}>
            {tags.map(tag => {
                return <Radio.Button key={tag.value} value={tag.value}>{tag.value}</Radio.Button>
            })}
        </Radio.Group>
        
    </div>
  )
}

export default Tags