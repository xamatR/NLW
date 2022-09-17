import express, { response } from 'express'
import { PrismaClient } from '@prisma/client'
import { hourToMinutes, minutesToHour } from './utils/convertHourStringMinutes'
import cors from 'cors'

const app = express()
app.use(express.json())

const prisma = new PrismaClient()

app.use(cors())



app.get('/games', async (request, response) => {
   const games = await prisma.game.findMany({
      include: {
         _count : {
            select: {
               ads: true
            }
         }
      }
   })

   return response.json(games);
});

app.post("/games/:id/ads", async (request, response) => {
   const gameId = request.params.id;
   let body = request.body;

   let ad = await prisma.ad.create({
      data: {
         gameId,
         name: body.name,
         yearsPlaying: body.yearsPlaying,
         discord: body.discord,
         weekDays: body.weekDays.join(","),
         hourStart: hourToMinutes(body.hourStart),
         hourEnd: hourToMinutes(body.hourEnd),
         useVoiceChannel: body.useVoiceChannel,
      }
   })

   return response.json(ad);   
});


app.get('/games/:id/ads' , async (request , response) => {
   const gameId = request.params.id
   
   let ads = await prisma.ad.findMany({
      select:{
         id: true,
         name: true,
         weekDays: true,
         useVoiceChannel: true,
         yearsPlaying: true,
         hourStart: true,
         hourEnd: true,
      },
      where: {
         gameId: gameId
      },
      orderBy: {
         createdAt: 'desc'
      }
   })
   
   return response.json(ads.map(ad => {
      return {
         ...ad,
         weekDays: ad.weekDays.split(','),
         hourStart: minutesToHour(ad.hourStart),
         hourEnd: minutesToHour(ad.hourEnd),
      }
   }));
});

app.get('/ads/:id/discord' , async (request , response) => {
   const adId = request.params.id

   const ad = await prisma.ad.findUniqueOrThrow({
      select:{
         discord: true,
      },
      where: { id: adId }
   })

   return response.json({
      discord: ad.discord,
   });
});

app.listen(3333)