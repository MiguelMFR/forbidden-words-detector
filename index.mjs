import { S3 } from '@aws-sdk/client-s3'
import { SNS, PublishCommand } from '@aws-sdk/client-sns';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers'

const s3 = new S3({ credentials: fromNodeProviderChain() })
const sns = new SNS({ credentials: fromNodeProviderChain() })

const BAD_WORDS = ['badword1', 'badword2', 'badword3', 'badword4', 'badword5']

export const handler = async (event) => {
    try {
        const bucket = event.Records[0].s3.bucket.name
        const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '))
        
        const data = await s3.getObject({ Bucket: bucket, Key: key })
        const contents = await data.Body.transformToString()
         
        const detectedWords = BAD_WORDS.filter(word => 
            contents.toLowerCase().includes(word.toLowerCase())
        ) 
        const badWordsCount = detectedWords.length
        
        if (badWordsCount > 0) {
            const message = `⚠️ ${badWordsCount} forbidden words detected in file '${key}': ${detectedWords.join(', ')}`;
            console.log("Mensagem de alerta:", message);

            await sns.send(new PublishCommand({
              TopicArn: process.env.SNS_TOPIC_ARN,
              Message: message,
              Subject: 'Forbidden Words Detected',
            }));
      
            return {
              statusCode: 200,
              body: JSON.stringify({ 
                message: 'Forbidden words detected',
                detectedWords 
              }),
            };
          } else {
            console.log("Nenhuma palavra proibida encontrada, mas o arquivo contém:", contents); 
            return {
              statusCode: 200,
              body: JSON.stringify({ 
                message: 'No forbidden words detected',
                fileContentSample: contents.substring(0, 100) + "..."
              }),
            };
          }
        } catch (error) {
          console.error('Erro:', error);
          return {
            statusCode: 500,
            body: JSON.stringify({ 
              error: 'Internal Server Error',
              details: error.message 
            }),
          };
        }
      };
