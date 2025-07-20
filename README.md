# Forbidden Words Detector com AWS Lambda, S3 e SNS

![Node.js](https://img.shields.io/badge/Node.js-18.x-orange?logo=node.js)
![AWS Lambda](https://img.shields.io/badge/AWS%20Lambda-function-orange?logo=aws-lambda)
![AWS S3](https://img.shields.io/badge/AWS%20S3-storage-green?logo=amazon-s3)
![AWS SNS](https://img.shields.io/badge/AWS%20SNS-messaging-pink?logo=amazon-aws)
![AWS SDK](https://img.shields.io/badge/AWS%20SDK-v3.422.0-yellow?logo=amazon-aws)

O projeto **Forbidden Words Detector** é uma função AWS Lambda escrita em Node.js 18 que é acionada automaticamente quando um arquivo `.txt` é enviado para um bucket S3. A função verifica se o conteúdo do arquivo contém palavras proibidas e, se encontrar, envia uma notificação via SNS (Simple Notification Service).

## Objetivo

Detectar automaticamente palavras inadequadas em arquivos de texto enviados para um bucket S3 e enviar alertas via SNS caso essas palavras sejam encontradas.

## Como Funciona

1. Um arquivo .txt é enviado para o bucket S3.
2. O Lambda é acionado automaticamente via evento do S3.
3. A função lê o conteúdo do arquivo.
4. Caso encontre palavras proibidas, envia uma mensagem para o tópico SNS configurado.

## Configuração

- Crie um Bucket S3 que servirá de gatilho.
- Crie um Tópico SNS e adicione assinantes (como um e-mail).
- Configure a variável de ambiente SNS_TOPIC_ARN no Lambda.
- Implemente a função Lambda com o código do index.mjs.
- Configure o Trigger do S3 para chamar a Lambda ao enviar arquivos .txt.

## Testando

Envie um arquivo .txt para o bucket com palavras como badword1 ou badword3 no conteúdo e verifique se a notificação foi enviada.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.
