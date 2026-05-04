# AWS Serverless Classic: Lambda + S3 + DynamoDB

This project is a classic serverless application built using the **Serverless Framework (v3)**. It demonstrates how to integrate core AWS services into a single automated workflow.

## How it Works
When the API endpoint is triggered:
1. **AWS Lambda** executes a Node.js function.
2. A new log entry is saved to **Amazon DynamoDB** with a unique timestamp.
3. A text file containing a success message is automatically generated and uploaded to an **Amazon S3** bucket.
4. The function returns an HTML response showing the current history of visits stored in the database.

## Project Structure
* `serverless.yml`: Infrastructure as Code (IaC) configuration, including IAM roles and AWS resource definitions.
* `handler.js`: The core logic of the application using AWS SDK v3.

## Live Demo
You can test the live API here: [https://tqc0zrq9o9.execute-api.us-east-1.amazonaws.com/dev/](https://tqc0zrq9o9.execute-api.us-east-1.amazonaws.com/dev/)