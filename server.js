//import ollama from 'ollama'

const PORT = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config
const ollama = require('ollama');
const app = express()
app.use(express.json())
app.use(cors())





app.post('/completions', async (req, res) =>{
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message}],
            max_tokens: 100,
        })
    }
    try{
       const response = await fetch('https://api.openai.com/v1/chat/completions', options)
       const data = await response.json()
       res.send(data)
       console.data(data)
    }catch (error){
        console.error(error)
    }
    /*const response = await ollama.chat({
        model: 'llama2',
        messages: [{ role: 'user', content: 'Why is the sky blue?' }],
      })
      console.log(response.message.content)*/
} )
app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT))