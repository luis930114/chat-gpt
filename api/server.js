/*const PORT = 8000 //8000 5000
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'https://chat-gpt-zeta-smoky-85.vercel.app'
}))


const API_KEY = "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"; //process.env.API_KEY


app.post('/api/completions', async (req, res) =>{
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
       console.log(response.json())
       res.send(data)
    }catch (error){
        console.error(error)
    }
} )
app.listen(PORT, '0.0.0.0',() => console.log('Your server is running on PORT ' + PORT))*/

const PORT = 5000; //8000 5000 8001(funciona en local)
const express = require('express');
const os = require('os');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());
/*app.use(cors({
    origin: 'https://chat-gpt-zeta-smoky-85.vercel.app'
}));*/

const networkInterfaces = os.networkInterfaces();
const ipAddresses = [];

// Obtener todas las interfaces de red y sus direcciones IPv4
Object.keys(networkInterfaces).forEach((key) => {
  networkInterfaces[key].forEach((networkInterface) => {
    if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
      ipAddresses.push(networkInterface.address);
    }
  });
});
console.log(ipAddresses)
app.use(cors({
  origin: 'http://http://192.168.64.3:8000', //'http://frontend:8000',//'http://172.27.0.3:8000', 
  methods: ['GET', 'POST'], // Permitir métodos específicos
  allowedHeaders: ['Content-Type', 'Authorization'] // Permitir los headers necesarios
}));

// Middleware para manejar las métricas CORS
app.use('/api/metrics', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://frontend:8000');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors({
  origin: ["http://localhost:3000", "http://172.20.0.3:8000", "http://172.21.0.3:8000"],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


const API_KEY = "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"; //process.env.API_KEY

app.post('/api/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message }],
            max_tokens: 100,
        })
    };
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        //console.log(data); // Cambiado a data en vez de response.json()
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la solicitud de completación');
    }
});

app.listen(PORT, '0.0.0.0', () => console.log('Your server is running on PORT ' + PORT));



/*const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors({
  //origin: 'https://chat-gpt-zeta-smoky-85.vercel.app'
}));

const API_KEY = "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" //process.env.API_KEY;

app.post('api/completions', async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 100,
    })
  };
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    console.log(API_KEY)
    console.log(options)
    console.log(response.json())
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error fetching data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log('Your server is running on PORT ' + PORT));*/
