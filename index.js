const express = require('express');
const app = express();
const PORT = 9000;

app.get('/', (req,res)=>{
    res.send('Bite Bazaar')
})

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT} `);
});