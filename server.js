const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Adicionando o middleware cors
app.use(express.json()); // Habilitando o uso de JSON no corpo das requisições

const users = {}; // Objeto para armazenar os nomes de usuário já criados

// Rota de registro de usuário
app.post('/register', (req, res) => {
  const { username } = req.body;
  if (username && !users[username]) {
    users[username] = true;
    res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.status(400).json({ error: 'Username already exists' });
  }
});

// Rota de login
app.post('/login', (req, res) => {
    const { username } = req.body;
    if (username && users[username]) {
      res.json({ redirectUrl: `/top-tracks/${username}` });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });

// Rota de obtenção das músicas favoritas do usuário
app.get('/top-tracks/:username', async (req, res) => {
    const { username } = req.params;
    if (users[username]) {
      try {
        const response = await axios.get('https://kworb.net/spotify/artist/3TVXtAsR1Inumwj472S9r4_songs.html');
        const html = response.data;
        const $ = cheerio.load(html);
        const topTracks = [];
  
        $('table.addpos tbody tr').each((index, element) => {
          if (index < 100) {
            const trackName = $(element).find('td.text div a').text();
            topTracks.push(trackName);
          }
        });
  
        res.json(topTracks);
      } catch (error) {
        console.error(`Error fetching top tracks for user ${username}:`, error);
        res.status(500).json({ error: 'Failed to fetch top tracks' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});