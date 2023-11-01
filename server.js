const express = require('express')
const fs = require('fs')
const porta = 8888

const service = express();

const api = fs.readFileSync('./fifa23_.json', 'utf-8')

let content = []
content = JSON.parse(api)


service.get('/', (request, response) => {
    response.sendFile(__dirname + '/ciccio.html');
});

service.get('/players', (req, res) => {
    fs.readFile('fifa23_.json', 'utf8', (err, data) => {
        try {
            const jsonData = JSON.parse(data);
            // Invia il JSON dal file come risposta
            res.json(jsonData);
        } catch (parseError) {
            console.error('Errore nella conversione del JSON:', parseError);
            res.status(500).send('Errore interno del server');
        }
    })
})

service.get('/players/:team', function (req, res) {

    res.set({ 'content-type': 'text/html; charset=utf-8' });
    var squadra = req.params.team


    let ris = content.filter(p => { return p.Club == squadra })

    if (ris.length > 0)
        res.status(200).end(JSON.stringify(ris));
    else
        res.status(400).end([]);

});

service.get('/team', (req, res) => {
    fs.readFile('fifa23_.json', 'utf8', (err, data) => {
        try {
            const jsonData = JSON.parse(data);
            const teams = jsonData.map(player => player.Club);
            // Rimuovi le nazioni duplicate (se necessario)
            const uniqueTeams = [...new Set(teams)];
            // Invia le nazioni come risposta
            res.json(uniqueTeams);
        } catch (parseError) {
            console.error('Errore nella conversione del JSON:', parseError);
            res.status(500).send('Errore interno del server');
        }
    })
})

service.get('/nation', (req, res) => {
    fs.readFile('fifa23_.json', 'utf8', (err, data) => {
        try {
            const jsonData = JSON.parse(data);
            const nations = jsonData.map(player => player.Nazionalita);
            // Rimuovi le nazioni duplicate (se necessario)
            const uniqueNations = [...new Set(nations)];
            // Invia le nazioni come risposta
            res.json(uniqueNations);
        } catch (parseError) {
            console.error('Errore nella conversione del JSON:', parseError);
            res.status(500).send('Errore interno del server');
        }
    })
})

service.get('/position', (req, res) => {
    fs.readFile('fifa23_.json', 'utf8', (err, data) => {
        try {
            const jsonData = JSON.parse(data);
            const positions = jsonData.map(player => player.Posizione);
            // Rimuovi le nazioni duplicate (se necessario)
            const uniquePositions = [...new Set(positions)];
            // Invia le nazioni come risposta
            res.json(uniquePositions);
        } catch (parseError) {
            console.error('Errore nella conversione del JSON:', parseError);
            res.status(500).send('Errore interno del server');
        }
    })
})

service.get('/top_gk', (req, res) => {
    fs.readFile('fifa23_.json', 'utf8', (err, data) => {
        try {
            const jsonData = JSON.parse(data);
            // Filtra i giocatori con posizione "GK"
            const gkPlayers = jsonData.filter(player => player.Posizione === "GK");
            // Ordina i giocatori per valore in ordine decrescente
            gkPlayers.sort((a, b) => b.Valore - a.Valore);
            // Prendi i primi 10 giocatori
            const top10GK = gkPlayers.slice(0, 10);
            // Invia i 10 migliori portieri come risposta
            res.json(top10GK);
        } catch (parseError) {
            console.error('Errore nella conversione del JSON:', parseError);
            res.status(500).send('Errore interno del server');
        }
    });
});



var server = require('http').createServer(service).listen(porta);

console.log("Server in ascolto alla porta " + porta)