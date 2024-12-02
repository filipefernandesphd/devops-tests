# DevOps Tests

Projeto para ajudar na implementação da infraestrutura da arquitetura da plataforma, ou seja, rotinas para obter os MVs e disponbilizá-los online.

## Estrutura do Projeto

- `./platform`: aplicação para simular a plataforma que receberá o link do repositório


# Workflow

1. A plataforma recebe o código do MV (por meio de repostório do git ou .zip)
1. A plataforma executa as rotinas de teste (como? onde?)
    - Hipótese:
        1. A plataforma salva o projeto em uma pasta padrão no servidor;
        1. O SO identifica que há uma nova pasta criada e inicia as seguintes rotinas:
            1. Cria um repositório da nova pasta criada na ferramenta de CI/CD (GitLab) 
            1. Cria a infraestrutura (a partir de código - *.yml) e executa os testes
            1. Se o teste passar, cria um docker, coloca o MV em produção e o workflow termina
            1. Se o teste não passar, cancela a operação (excluir pasta e repositório) e o workflow termina


# Instruções

## Automatizar rotinas no Linux

**OBSERVAÇÃO!** As imagens Linux do Docker são instaladas com o mínimo possível de pacotes. Por isso, verifique se o pacote ou programa está instalado.

Como exemplo, será criada uma rotina de que, toda vez que criar uma pasta em `/home/projects`, um arquivo .txt com o mesmo nome da pasta será criada dentro da nova pasta.

#### 1. Instalar inotify:
`apt update && apt install inotify-tools`

#### 2. Criar um script para monitoramento:
(Ex: `/home/monitor.sh`):
```bash
#!/bin/bash

PASTA_MONITORADA="/home/projects"

inotifywait -m -e create --format "%w%f" "$PASTA_MONITORADA" | while read NOVO_ITEM; do
    if [ -d "$NOVO_ITEM" ]; then
        echo "Nova pasta criada: $NOVO_ITEM"
        
        # Criar um arquivo .txt com o mesmo nome da pasta criada
        ARQUIVO_TXT="$NOVO_ITEM/$(basename "$NOVO_ITEM").txt"
        touch "$ARQUIVO_TXT"
        echo "Arquivo criado: $ARQUIVO_TXT"
    fi
done
```

#### 3. Tornar o script executável e testá-lo:
```bash
chmod +x monitor.sh
./monitor.sh
```

#### 4. Rodar o script como um serviço:
`nano /etc/systemd/system/monitor.service`
```bash
[Unit]
Description=Monitoramento de Pasta

[Service]
ExecStart=/home/monitor.sh
Restart=always

[Install]
WantedBy=multi-user.target
```

#### 5. Ativar e iniciar o serviço:
```bash
sudo systemctl daemon-reload
sudo systemctl enable monitor.service
sudo systemctl start monitor.service
```