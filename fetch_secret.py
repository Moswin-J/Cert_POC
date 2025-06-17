import boto3
import json

def fetch_secret():
    secret_name = "myapp/testdata"
    region_name = "eu-west-1"

    # Create Secrets Manager client
    client = boto3.client('secretsmanager', region_name=region_name)

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        secret = get_secret_value_response['SecretString']
        secret_json = json.loads(secret)

        print("✅ Fetched Successfully")
        print("private_key starts with:", secret_json['private_key'][:30])
        print("public_cert starts with:", secret_json['public_cert'][:30])
        print("ca_chain starts with:", secret_json['ca_chain'][:30])

    except Exception as e:
        print("❌ Error fetching secret:", str(e))


if __name__ == "__main__":
    fetch_secret()
