import express, { response } from 'express'

const app = express()

app.get('/games', (request, response) => {
   return response.json(['1', '2', '3']);
});

app.post('/ads', (request, response) => {
   response.status(201).json([]);
});


app.get('/games/:id/ads' , (request , response) => {
   const id = Number(request.params.id);

   return response.json([
    {id: 1 , name :'Anúcio 1'},
    {id: 2 , name :'Anúcio 2'},
    {id: 3 , name :'Anúcio 3'},
    {id: 4 , name :'Anúcio 4'},
   ])
})

app.get('/ads/:id/discord' , (request , response) => {

});

app.listen(3333)