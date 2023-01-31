import React, {useState} from 'react'
import { Radio, Input, Button } from 'antd'

const { Search } = Input

const Tags = () => {
    const [tagValue, setTagValue] = useState("")
    const [tags, setTags] = useState([])

    const onInputChange = (value) => {
        if (value === "" || value === null || value === undefined) return
        if (tags.includes(value)) return

        setTags([...tags, value])
        console.log([...tags, value])
    }

    const onTagChange = (e) => {
        if (e.target.value === "" || e.target.value === null) return
        setTagValue(e.target.value)
    }

    const handleTagDelete = (e) => {
        const filteredTags = tags.filter(tag => tag !== tagValue)
        console.log(tags.at(-2))
        if (tags.length >= 1) setTagValue(tags[-2])
        setTags(filteredTags)
    }

  return (
    <div className='textbox'>
        <Search
            style={{ color: 'red', display: 'block', minWidth: '10em', width: "60%", marginBottom: "1em" }}
            placeholder="Enter Tag Name"
            allowClear
            enterButton="Add"
            size="medium"
            onSearch={onInputChange}
        />
        {tags.length > 0 && <div className='flex justify-between'>
            <div>Selected Tag: {tagValue}</div>
            <div>
                <Button onClick={handleTagDelete} type="primary" danger>
                    Delete
                </Button>
            </div>
        </div>}
        <Radio.Group defaultValue="Name" buttonStyle="solid" className='textbox' onChange={onTagChange} value={tagValue}>
            {tags.map(tag => {
                return <Radio.Button key={tag} value={tag}>{tag}</Radio.Button>
            })}
        </Radio.Group>
        
    </div>
  )
}

export default Tags