// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

// Function to ask for additional steps
function askForAdditionalSteps(section, data) {
    return inquirer.prompt([
        {
            type: "confirm",
            name: "addStep",
            message: `Would you like to add another step to the ${section}?`
        },
        {
            type: "input",
            name: "nextStep",
            message: `Please provide the next step for the ${section}.`,
            when: (answers) => answers.addStep
        }
    ]).then((answers) => {
        if (answers.addStep) {
            data[section] += "\n" + answers.nextStep;
            return askForAdditionalSteps(section, data);
        } else {
            return data;
        }
    });
}

// TODO: Create an array of questions for user input
async function askQuestions() {
    const sections = [
        {
            type: "input",
            name: "title",
            message: "What is the title of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Please provide a description of your project."
        },
        {
            type: "input",
            name: "link",
            message: "Please provide any relevant links for your project."
        },
        {
            type: "input",
            name: "installation",
            message: "Please provide installation instructions for your project.",
            additionalSteps: true
        },
        {
            type: "input",
            name: "usage",
            message: "Please provide usage information for your project.",
            additionalSteps: true
        },
        {
            type: "input",
            name: "contribution",
            message: "Please provide contribution guidelines for your project.",
            additionalSteps: true
        },
        {
            type: "input",
            name: "test",
            message: "Please provide test instructions for your project.",
            additionalSteps: true
        },
        {
            type: "list",
            name: "license",
            message: "Please select a license for your project.",
            choices: ["MIT", "Apache 2.0", "GPL 3.0", "BSD 3", "None"]
        },
        {
            type: "input",
            name: "github",
            message: "Please provide your GitHub username."
        },
        {
            type: "input",
            name: "email",
            message: "Please provide your email address."
        }
    ];

    let data = {};

    for (const section of sections) {
        const answer = await inquirer.prompt({
            type: section.type || "input",
            name: section.name,
            message: section.message,
            choices: section.choices,
        });

        data = { ...data, ...answer };

        if (section.additionalSteps) {
            data = await askForAdditionalSteps(section.name, data);
        }
    }

    return data;
}
// TODO: Create a function to initialize app
function init() {
    askQuestions()
        .then((data) => {
            const readMeContent = generateMarkdown(data);

            // TODO: Create a function to write README file
            fs.writeFile("README.md", readMeContent, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Success!');
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

// Function call to initialize app
init();