const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

//require puppeteer package that will create pdf
const puppeteer = require("puppeteer");

//require local file that contains html template into which data will be plugged
const generateHTML = require("./generateHTML");

//create questions object with prompts for user to be used with inquirer
const questions = [{
        type: "input",
        name: "username",
        message: "Enter GitHub username:"
    },

    {
        type: "list",
        name: "color",
        message: "Select preferred color:",
        choices: ["red", "blue", "green", "pink"]
    }

];

//this function will prompt the user for information, pull data from the api before generating a pdf in the local folder
function initiate() {

    //*Inquirer For User Prompt */
    //prompt user from questions object, then use those responses to generate html and pull data from github
    inquirer.prompt(questions)

    //then with the username and color returned from the user's input...
    .then(({ username, color }) => {

        //*Axios and GitHub API for updating html template */

        function getGitHubData() {
            return axios.get(`https://api.github.com/users/${username}`);
        }

        function getGitHubStars() {
            return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
        }

        //use all to run both functions and return responses
        axios.all([getGitHubData(), getGitHubStars()])

        .then(axios.spread(function(githubdata, githubstars) {
                // console.log(dataStars);
                // console.log(data);

                //set variable that will contain the sum of all the stars pulled from the dataStars response
                let dataStarsVal = 0;

                //for each item in the dataStars object (from GitHub) grab the value and add together in dataStarsVal
                githubstars.data.forEach(function(a) {
                    dataStarsVal += a.stargazers_count;
                });


                //* Generate PDF content with Puppeteer */

                //pull template from generateHTML to create pdf using puppeteer code below
                (async() => {

                    try {

                        const browser = await puppeteer.launch();

                        const page = await browser.newPage();

                        const html = generateHTML({ color }, githubdata, dataStarsVal);

                        await page.setContent(html);

                        //output resume pdf in A4 letter format. printBackground will display css
                        await page.pdf({ path: `./profiles/profile_${username}.pdf`, format: 'A4', printBackground: true });

                        //indicate file was saved
                        console.log(`profile_${username}.pdf successfully saved to "profile" folder.`);


                        await browser.close();

                        process.exit();

                        //end try - to catch
                    } catch (e) {

                        console.log('our error', e);

                        //end catch
                    }

                    //end async
                })();

                //end axios call - catch
            }))
            .catch(err => {
                console.log(err)
            });


        //end inquirer
    });

    //end initiate function
}

//when the index.js is run, call initiate by default
initiate();