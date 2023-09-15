import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT; // Port sur lequel le serveur écoutera
/////////////////////////////////////////////////////////////////////////////////Sequelize
import { Sequelize, DataTypes } from "sequelize";
// Configuration de Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
});

// Modèle Sequelize
const Recipe = sequelize.define('Recipe', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false, 
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  duree: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  pictureSrc: {
    type: DataTypes.STRING,
    allowNull: false, 
    unique: false,
  },
});

//sequelize.sync({force:true});
sequelize.sync();
/////////////////////////////////////////////////////////////////////////////////
// Middleware pour le support JSON
app.use(express.json());

// Route de test
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello, world!' });
});

  function replaceAll(input: string, toReplace: string, by: string){
    return input
        .split('')
        .map( (letter: string) => {
            letter.replace(toReplace, by)
            return letter
        })
  }
//route pour ajouter une nouvelle recette a la BDD
app.post('/api/addNewRecipe/:name/:note/:duree/:imgSrc', async (req: Request, res: Response) => {
  await Recipe.create({name:req.params.name ,
    note:req.params.note ,
    duree:req.params.duree ,
    pictureSrc:replaceAll(req.params.imgSrc , "%2F" , "/")})
  res.send("ok")
}); 
// Gestion des erreurs 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
