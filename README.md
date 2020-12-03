# BarkPoint
Entertain your pet by either finding a toy or park to play.

## Description
Bark Point is an app designed to help dog owners find the perfect toys suited to their dog's
personality type.

When a users first log in, the app has the user complete a fun, short personality test for their dog. The personality test utilizes **react tinder cards** allowing the user to _drag_ a card right(yes) or left(no) to answer.

Upon personality test completion, a form that takes in more dog data is displayed. After the form is filled and submitted by the user, the user is sent to a **toy box** page where they can favorite toys for their dog. Clicking on the image of a toy will bring the user to that items purchase page on **Amazon**.

Users can also access a **park** page which renders a map of their surrounding area and provides pinpoints for nearby dog parks. Users can also add their own pinpoints for new parks!

Users can access their dog's profiles and add/remove toys on the **profile** page. Users can add another dog on the **profile** or **park** page.

## Dependencies
========
```javascript
"dependencies": {
    "@material-ui/core": "^4.11.1",
    "@material-ui/icons": "^4.9.1",
    "@material-ui/styles": "^4.11.1",
    "@reach/combobox": "^0.12.1",
    "@react-google-maps/api": "^1.13.0",
    "@types/express": "^4.17.9",
    "@types/qs": "^6.9.4",
    "axios": "^0.21.0",
    "browserify": "^17.0.0",
    "chai": "^4.2.0",
    "clsx": "^1.1.1",
    "date-fns": "^2.16.1",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "faker": "^5.1.0",
    "google-maps-react": "^2.0.6",
    "google-search-results-serpwow": "0.0.14",
    "mocha": "^8.2.1",
    "mongoose": "^5.10.16",
    "nodemon": "^2.0.6",
    "passport": "^0.4.1",
    "passport-google-oauth20": "^2.0.0",
    "prop-types": "^15.7.2",
    "react": "^16.14.0",
    "react-dom": "^16.14.0",
    "react-dropzone": "^11.2.4",
    "react-google-button": "^0.7.1",
    "react-google-login": "^5.1.25",
    "react-hook-form": "^6.11.5",
    "react-router-dom": "^5.2.0",
    "react-tinder-card": "^1.3.1",
    "regenerator-runtime": "^0.13.7",
    "session": "^0.1.0",
    "superagent": "^6.1.0",
    "twilio": "^3.52.0",
    "use-places-autocomplete": "^1.6.0",
    "webpack": "^5.6.0",
    "webpack-cli": "^4.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9",
    "@babel/preset-env": "^7.12.7",
    "@babel/preset-react": "^7.12.7",
    "babel-loader": "^8.2.1",
    "css-loader": "^5.0.1",
    "eslint": "^7.14.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-react": "^7.21.5",
    "eslint-plugin-react-hooks": "^4.2.0",
    "husky": "^4.3.0",
    "lint-staged": "^10.5.2",
    "style-loader": "^2.0.0"
  },
```
## Installation and Startup

1. Fork the **Bajamen/BarkPoint** repo

2. Clone your **forked repo** into your file system

3. Run **npm install** to install dependencies

```bash
  npm install
```

4. Create a **.env** file in your main directory and install the dotenv package

```bash
  npm install dotenv
```
The **.env** file will house all of your keys and other sensitive information

Variable | Description
--------------|--------------
CLIENT_ID | key from google Oauth
CLIENT_SECRET | secret generated from google Oauth
SERPWOW_KEY | key to use serpwow api (more on serpwow below)
GOOGLE_MAPS_KEY | key to use google maps api
TWILIO_SID |
TWILIO_TOKEN |
FOUR_SQUARE_CLIENT_ID | key from four square
FOUR_SQUARE_CLIENT_SECRET | secret generated from four square
CLOUDINARY_UPLOAD_PRESET |
CLOUDINARY_UPLOAD_URL |
DB_USER |
DB_PASS |
DB_HOST |
DB_DB |

4. Use **npm run prod** to build webpack and render the client side
5. If mongo is installed, start mongodb server

```bash
  sudo service mongodb start
```

  If mongo is not installed follow the steps on the official website:
  https://docs.mongodb.com/manual/installation/

6. Use **npm run start** to start local server

## Serpwow


## Deployment

Once the application is configured with the appropriate environmental variables and installations, a
deployment strategy will now be implemented.

This application has utilized google cloud for deployment, to begin setting up a personal google cloud
service, follow the guide mentioned below thoroughly to create a new project instance.

```
https://cloud.google.com/appengine/docs/standard/nodejs/building-app/deploying-web-service
```

Once a new project is fully configured with an app engine, it's now time to set up what the app engine
will read once the application is deployed; the app.yaml.

Let's first create an app.yaml by issuing ```bash touch app.yaml``` in the root directory of the repository.

Inside of the app.yaml, insert the following code below:

```yaml
runtime: nodejs
env: flex

env_variables:
  CLIENT_ID: ...
  CLIENT_SECRET: ...
  SERPWOW_KEY: ...
  GOOGLE_MAPS_KEY: ...
  TWILIO_SID: ...
  TWILIO_TOKEN: ...
  FOUR_SQUARE_CLIENT_ID: ...
  FOUR_SQUARE_CLIENT_SECRET: ...
  CLOUDINARY_UPLOAD_PRESET: ...
  CLOUDINARY_UPLOAD_URL: ...
```

Now, bare in mind that there are environmental variables being declared within the scope of this file. To ensure
security, check the .gitignore previously generated and search for the name "app.yaml", if the name does not exist
inject the name inside the file.

Once the app.yaml is finished, what will be needed next is a .gcloudignore file to ensure that the node modules
directory does not accidentally pass on as data during the deployment stage. Issue the command ```bash touch .gcloudignore```
in the bash terminal and inside the file add **node_modules/** as well as **bower_components**.

Now that the two files mentioned above are configured, it's time to deploy this repository. This task can be done on the
local machine by using google cloud's deployment-ready shell known as **cloud-SDK**.

To install cloudSDK, follow the installation guide on the official site here - https://cloud.google.com/sdk/docs/install

Once cloudSDK is officially installed onto the machine, be sure to shell into the right project by issuing the command below:

```bash gcloud config set project my-project ```

When the project is then selected, be sure that the latest dependencies are installed, and the latest pull has been made.

Lastly, enter the command below to deploy the application:

```bash gcloud app deploy ```

A prompt will then pop up in the middle of the deployment staging. Be sure to issue **Y** to ensure that the file path is
correct for app deployment.
