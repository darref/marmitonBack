"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT; // Port sur lequel le serveur écoutera
/////////////////////////////////////////////////////////////////////////////////Sequelize
const sequelize_1 = require("sequelize");
// Configuration de Sequelize
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});
// Modèle Sequelize
const Recipe = sequelize.define('Recipe', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    note: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    duree: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    pictureSrc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
});
//sequelize.sync({force:true});
sequelize.sync();
/////////////////////////////////////////////////////////////////////////////////
// Middleware pour le support JSON
app.use(express_1.default.json());
// Route de test
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
});
function replaceAll(input, toReplace, by) {
    return input
        .split('')
        .map((letter) => {
        letter.replace(toReplace, by);
        return letter;
    });
}
//route pour ajouter une nouvelle recette a la BDD
app.post('/api/addNewRecipe/:name/:note/:duree/:imgSrc', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Recipe.create({ name: req.params.name,
        note: req.params.note,
        duree: req.params.duree,
        pictureSrc: replaceAll(req.params.imgSrc, "%2F", "/") });
    res.send("ok");
}));
// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});
// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
