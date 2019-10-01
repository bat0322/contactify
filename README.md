# hack-a-thing-2-contact-us
Zack Johnson and Brian Tomasco

## What we attempted to build
Whenever a new organization welcomes new members, it is always a goal to make sure that all of the old and new members has everybody's phone numbers. One of the easiest ways of doing this is via creating a .vcf file that holds everybody's contact information and then sending that file out to everybody. When you download that file, all of the contacts are added to your phone. Brian and I wanted to create an easier, more decentralized way of doing this. We attempted to build a website where people can upload their contact information and then that website would create the vcf file on its own and send it out when prompted. 

The technical learning goal of this project was to learn how to use Amazon Web Services. We first started by following the tutorial found here (https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/) to learn how to build a serverless web app using AWS. What we created (found at: http://contact-us-johnson-tomasco.s3-website-us-east-1.amazonaws.com/) was a website where users can sign in and request a unicorn ride. Then the site chooses an available unicorn and 'sends' it to the users location. This is represented by an animated unicorn flying to the user's location on a map. To sign up, click the 'giddy up' button. You will need to verify your account over email. It should bring you to the ride page after signing in, but if it doesn't, please visit the route /ride.html. 

Once we had finished this tutorial, we set out upon building the VCF site (found at: http://contactify-johnson-tomasco.s3-website-us-east-1.amazonaws.com/). We used HTML/CSS/JQuery to build the front end and hosted it on S3. We then created a backend using DynamoDB and wrote AWS Lambda functions to manage the data, and create the VCF. We used Amazon SES to send the email and API Gateway to expose the API to the front end. We essentially have two post endpoints: /contact (uploads a contact) and /vcf (which sends a vcf to the provided email).

## Who did what

A good chunk of this project, we just did together, pair programming. We will only mention here our individual contributions, which are as follows:

Tutorial =>  
Zack (Modules 1,2,4): 
  - Host a static website
  - Manage users
  - Deploy a RESTful API
Brian (Module 3): 
  - Build a serverless backend
  
VCF Project =>
Zack:
  - Front end
  - Website hosting
  - VCF endpoint deployment
Brian:
  - Upload Contact Lambda function
  - DynamoDB setup
  - Contact endpoint deployment
  - Initial draft of VCF Lambda

## What we learned

We now both feel that we have a fairly good basic understanding of AWS and its associated services. We were able to create a serverless web application without consulting the tutorial very often, which we were very happy about. We were both quite impressed with the power and flexibility that AWS offers. We also learned how to create a VCF file programmatically.

## How does it relate to a possible project idea

We both doubt we will use this idea as a project. However, we could definitely see ourselves using AWS and associated services to do at least some portion of our eventual project.

## What didn't work

It was quite hard to figure out how to send emails with attachments using SES. There wasn't amazing documentation on how to do this. We also struggled with reading and writing files in javascript in the context of a lambda function. We also realized we cannot use libraries when writing lambdas in the web client for AWS. Next time, it would be good to do it locally using the AWS CLI. 
