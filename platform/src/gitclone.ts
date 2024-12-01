import { exec } from "child_process";

// Função para clonar um repositório
export function cloneRepository(repoUrl: string, destinationFolder: string, dir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Monta o comando git clone
    const command = `git clone ${repoUrl} ${destinationFolder}/${dir}`;

    console.log(`Executando: ${command}`);

    // Executa o comando
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao clonar o repositório: ${stderr}`);
        return reject(error);
      }
      console.log(`Repositório clonado com sucesso: ${stdout}`);
      resolve();
    });
  });
}

// Exemplo de uso
// const repoUrl = "https://github.com/seu-usuario/seu-repositorio.git";
// const destinationFolder = "./meu-projeto";

// cloneRepository(repoUrl, destinationFolder)
//   .then(() => console.log("Clone realizado com sucesso!"))
//   .catch((err) => console.error("Erro:", err));