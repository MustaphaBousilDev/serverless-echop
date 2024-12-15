# serverless-echop
application backend using serverless architecture with AWS cloud infrastructure


Steps


01-sudo npm i -g serverless@2

02-serverless config credentials --provider aws --key your-access-key --secret your-secret-key (from IAM)

03-open ~/.aws  (for verify connection)

04-cmd(serverless create -t aws-nodejs) for creating function hundler.js and serverless yaml file for infrastructure as code 

05-add your code and each time you want to deploy to AWS (cmd-> serverless deploy)


