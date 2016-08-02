## Watson Spreadsheet

##### Integrating a Google Spreadsheet with Watson services

This is a Node application that reads questions and answers from a Google Spreadsheet and runs Watson Tone Analysis on the answers. It writes the measured tone into rows of the Spreadsheet.

It requires Google API Authentication as outlined in the npm google-spreadsheet documentation, and Watson Tone API Authentication as outlined in the Watson docs.

![Spreadsheet screenshot](./google concept analysis.png)

##### Why is this useful?

This app was inspired by a real world use case, where a company routinely runs interviews, and wishes to automatically derive insight from them - ideally converting speech to text first. The spreadsheet offers a friendly and efficient visual interface for initial analysis. The company uses Google Docs for a lot of their data.


Run the app locally

- [Install Node.js if not done already]: https://nodejs.org/en/download/

- cd into the app directory
- Run `npm install` to install the app's dependencies
- Update the app with your own tone analyzer service credentials
- For writing to the Google Spreadsheet, you'll need your own API key
- Details and examples are here: https://www.npmjs.com/package/google-spreadsheet
- Input is a spreadsheet with columns for questions + answers and one for each emotional tone ...
- My example spreadsheet ( John Lennon, Rolling Stone interview ) https://docs.google.com/spreadsheets/d/1UVbnv8KJ5ycYxdl_1LIr7XzFaPGhRqvf5SQRCrBqwpg/pubhtml
- Create a Watson Tone Analyzer service on Bluemix and obtain credentials for it ( see note below )
- Add Alchemy Service from Bluemix ( for concepts )
- Type `node app` to run the app

Note

You need to add your own Google credentials file. Call the file 'google-credentials.json'. When you follow the directions from the npm google-spreadsheet package, the Google API page should offer a json file that looks something like this:

```

{
    "type": "service_account",
    "project_id": "api-project-823610595314",
    "private_key_id": "60939832a3ce57796ab0b28af2324a4a1ae6cf3e",
    "private_key": "-----BEGIN PRIVATE KEY-----\n K E Y \n-----END PRIVATE KEY-----\n",
    "client_email": "n a m e @ p r o j e c t.iam.gserviceaccount.com",
    "client_id": "107482837433615417696",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "expires": "",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/stakeholder%40api-project-823610595314.iam.gserviceaccount.com"
}

```


And you need to add your own Watson Tone credentials file. Call the file 'tone-credentials.json'. You can find this key from the service you create on Bluemix.

It looks something like this:

```
{
    "url": "https://gateway.watsonplatform.net/tone-analyzer/api/",
    "password": "p a s s w o r d",
    "username": "y o u r   u s e r n a m e",
    "version_date": "2016-05-19",
    "version": "v3"
}
```

And Alchemy credentials file:

```{
    "name": "alchemy-solid",
    "label": "alchemy_api",
    "plan": "free",
    "credentials": {
        "url": "https://gateway-a.watsonplatform.net/calls",
        "note": "It may take up to 5 minutes for this key to become active",
        "apikey": " a p i   k e y"
    }
}```


