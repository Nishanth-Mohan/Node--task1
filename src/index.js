// Importing express to create express server
import express from 'express';

// Importing fs to create and retrieve files
import fs from 'fs';

// Importing format from date-fns third-party library to format the date and time
import { format } from 'date-fns';

// Creating app server
const app = express();

// Creating port
const PORT = 3333;

// Showing home page
app.get('/', (req, res) => {
    // Sending response status
    res.status(200).send(`
    <h1 style="background-color:skyblue;padding:10px 0px;text-align:center">
    Express Server is Connected !</h1>
    <div style="text-align:center">
    <p><span style="background-color:lightgreen;font-size:18px"> To Create a New txt file</span> --> <a href="/new-create-write-read-txt">Click Here</a></p>
    <p><span style="background-color:skyblue;font-size:18px">To Retrieve All txt file</span> --> <a href="/read-all-txtFiles">Click Here</a></p>
    </div>
    `);
});

// Creating new data-time.txt file and reading its content
app.get('/new-create-write-read-txt', (req, res) => {
    try {
        // Getting current date and time
        const now = new Date();
        const currentTimeStamp = format(now, "dd-MM-yyyy-HH-mm-ss");

        // Getting timezone name and offset
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const offset = now.getTimezoneOffset(); // in minutes

        // Creating filePath & txt file
        const filePath = `./TimeStamp/${currentTimeStamp}.txt`;

        // Generating the content of the txt file including timezone
        const content = `Current TimeStamp: ${currentTimeStamp}\nTimezone: ${timezone}\nTimezone Offset (in minutes): ${offset}`;

        // Creating the txt file
        fs.writeFileSync(filePath, content, 'utf8');

        // Reading the created txt file
        const data = fs.readFileSync(filePath, 'utf8');

        // Sending response status and data
        res.status(200).send(`<div style="background-color:green;padding:10px 0px;text-align:center;color:white">
            <h1>File created successfully!</h1>
            <p>Txt File Name: ${currentTimeStamp}.txt</p>
            <p>Txt File Content: ${data}</p>
            <p><a href="/" style="color:yellow">Back to Home</a></p>
        </div>`);
    } catch (err) {
        // Throwing error if the file doesn't exist or there's any other error
        res.status(500).send(`<h1 style="background-color:red;padding:10px 0px;text-align:center;color:white">
            Error reading file: ${err.message}</h1>`);
    }
});

// Reading all text files from the TimeStamp directory
app.get('/read-all-txtFiles', (req, res) => {
    try {
        // Reading all files in the TimeStamp directory
        const files = fs.readdirSync('./TimeStamp');

        // Filter out only the text files
        const txtFiles = files.filter(file => file.endsWith('.txt'));

        // Sending response status and data
        res.status(200).send(`<h1 style="background-color:blue;padding:10px 0px;text-align:center;color:white">
            All Retrieved Text Files<p><a href="/" style="color:yellow">Back to Home</a></p></h1>
            <ul>${txtFiles.map(file => 
            `<dl style="display: list-item;list-style-type: disc;">
            <dt><b>File Name : </b>${file}</dt>
            <dd style="display: list-item;list-style-type: circle;"><b>File Content : </b>${fs.readFileSync(`./TimeStamp/${file}`, 'utf8')}</dd>
            </dl>`).join('')}</ul>`);
    } catch (err) {
        // Throwing error if anything goes wrong
        res.status(500).send(`<h1 style="background-color:red;padding:10px 0px;text-align:center;color:white">
            Error reading files: ${err.message}</h1>`);
    }
});

// Listening to the created server port
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
});
