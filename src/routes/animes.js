import { Router } from "express";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const animesFilePath = path.join(__dirname, '../../data/anime.json');
console.log((animesFilePath));

const readAnimesFile = () => {
    const animes = fs.readFileSync(animesFilePath, 'utf8');
    return JSON.parse(animes)
};


const writeAnimesFile = (animes) => {
    fs.writeFileSync(animesFilePath, JSON.stringify(animes, null, 2));
};

router.post('/', (req, res) => {
    const animes = readAnimesFile();
    const newAnime = {
        id: animes.length + 1,
        name: req.body.name,
        genre: req.body.genre
    }

    animes.push(newAnime);
    writeAnimesFile(animes);
    res.status(201).json({"message": "Anime added successfully", "anime": newAnime});

});

router.get('/', (req, res) => {
    const animes = readAnimesFile();
    res.json(animes);
});

router.get('/:id', (req, res) => {
    const animes = readAnimesFile();
    const anime = animes.find(a => a.id === parseInt(req.params.id));
    if(!anime) return res.status(400).send("Anime not found");
    res.status(200).json(anime);
});

router.put('/:id', (req, res) => {
    const animes = readAnimesFile();
    const animeIndex = animes.findIndex(a => a.id === parseInt(req.params.id));
    if(animeIndex === -1) return res.status(400).send("Anime not found");
    const updateAnime = {
        ...animes[animeIndex],
        name: req.body.name,
        genre: req.body.genre
    }
    animes[animeIndex] = updateAnime;
    writeAnimesFile(animes);
    res.status(200).json({"message": "Anime updated successfully", "anime": updateAnime});

});

router.delete('/:id', (req, res) => {
    let animes = readAnimesFile();
    const anime = animes.find(a => a.id === parseInt(req.params.id));
    if(!anime) return res.status(400).send("Anime not found");
    animes = animes.filter(a => a.id !== anime.id);
    writeAnimesFile(animes);
    res.json({"message": "Anime delete successfully"})

});


export default router;