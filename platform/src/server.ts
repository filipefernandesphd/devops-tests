import express, {Request, Response} from "express";
import { cloneRepository } from "./gitclone";

const app = express();
const PORT = process.env.PORT || 3003;

app.get('/' , (req:Request, res:Response)=>{
    res.send('Olá, Mundo!');
});

app.get('/upload' , (req:Request, res:Response)=>{
    res.send('Página para upload');

    const destinationFolder = "./projetos";
    const repoUrl = "https://github.com/filipefernandesphd/IHC.git";
    const dir = "projeto";

    cloneRepository(repoUrl, destinationFolder, dir)
      .then(() => console.log("Clone realizado com sucesso!"))
      .catch((err) => console.error("Erro:", err));
});

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});