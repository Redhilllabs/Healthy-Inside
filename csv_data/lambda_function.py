import json
import boto3

def lambda_handler(event, context):
    region = 'us-east-1'
    dynamodb = boto3.client('dynamodb', region_name=region)
    
    try:
        s3 = boto3.resource('s3')
        bucket = event["Records"][0]["s3"]["bucket"]["name"]
        key = event["Records"][0]["s3"]["object"]["key"]
        print(f'Bucket: {bucket}, Key: {key}')

        json_object = s3.Object(bucket, key)
        print(json_object)
        data = json.loads(json_object.get()['Body'].read().decode('utf-8'))
        
        for item in data:
            item_to_put = {
                'IngredientName': {'S': item['ingredient']},
                'quantity': {'S': str(item['quantity'])}
            }
            dynamodb.put_item(TableName='PUratio', Item=item_to_put)
    except KeyError as e:
        print(f'Missing key: {e}')
        raise e
    except Exception as e:
        print(str(e))
        raise e
