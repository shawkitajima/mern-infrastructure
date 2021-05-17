# Use Instructions
1. download dependencies: ``npm i``
2. create the build directory: ``npm run build``
3. add the .env file: ``touch .env``
4. to the .env file, add:
    * DATABASE_URL
    * SECRET

# Heroku Deployment
1. add the Procfile: ``touch Procfile``
    * add the start instructions ``web: node server.js``
2. commit changes to ``main`` branch
3. login to heroku CLI: ``heroku login``
4. create heroku project: ``heroku create <optional_preferred_subdomain>``
5. push to heroku branch: ``git push heroku main``
6. add environment variables to heroku:
    * ``heroku config:set <Your Key>=<The Value>``
    * key value pairs must be in double quotes if using zsh
7. open heroku link: ``heroku open``
