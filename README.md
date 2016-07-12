## Watson Spreadsheet

##### Integrating a Google Spreadsheet with Watson services

This is a Node application that reads questions and answers from a Google Spreadsheet and runs Watson Tone Analysis on the answers. It writes the measured tone into rows of the Spreadsheet.

It requires Google API Authentication as outlined in the npm google-spreadsheet documentation, and Watson Tone API Authentication as outlined in the Watson docs.

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
- Type `node app` to run the app
