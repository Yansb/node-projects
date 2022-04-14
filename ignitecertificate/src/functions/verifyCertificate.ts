import { APIGatewayProxyHandler } from "aws-lambda";
import {document} from "../utils/dynamodbClient";

interface IUserCertificate {
  name: string;
  id: string;
  created_at: string;
}

export const handler:APIGatewayProxyHandler = async (event) => {
  const {id} = event.pathParameters;


  const response = await document.query({
    TableName: "users_certificate",	
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise();


  const userCertificate = response.Items[0] as IUserCertificate;

  if(userCertificate){
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Valid certificate",
        name: userCertificate.name,
        url: `https://certificateignitenodeyan.s3.amazonaws.com/${id}.pdf`
      })
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Invalid certificate"
    })
  }
}

