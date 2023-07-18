// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {

  if (license === "MIT") {
    return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  } else if (license === "Apache 2.0") {
    return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)]";
  } else if (license === "GPL 3.0") {
    return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)]";
  } else if (license === "BSD 3") {
    return "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)]";
  } else if (license === "None") {
    return "";
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {

  if (license === "MIT") {
    return "https://opensource.org/licenses/MIT";
  } else if (license === "Apache 2.0") {
    return "https://opensource.org/licenses/Apache-2.0";
  } else if (license === "GPL 3.0") {
    return "https://www.gnu.org/licenses/gpl-3.0";
  } else if (license === "BSD 3") {
    return "https://opensource.org/licenses/BSD-3-Clause";
  } else if (license === "None") {
    return "";
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {

  if (license === "MIT") {
    return "MIT License";
  } else if (license === "Apache 2.0") {
    return "Apache 2.0 License";
  } else if (license === "GPL 3.0") {
    return "GPL 3.0 License";
  } else if (license === "BSD 3") {
    return "BSD 3-Clause License";
  } else if (license === "None") {
    return "";
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  let installationSteps = "";
  let stepCount = 1;

  while (data[`step${stepCount}`]) {
    installationSteps += `${stepCount}. ${data[`step${stepCount}`]}\n`;
    stepCount++;
  }
  return `# ${data.title}
${renderLicenseBadge(data.license)}

## Description
${data.description}

${data.link} 

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Test](#test)
* [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## License
This project is licensed under the ${renderLicenseSection(data.license)} - see the [LICENSE.md](${renderLicenseLink(data.license)}) file for details.

## Contributing
${data.contribution}

## Test
${data.test}

## Questions
If you have any questions, please feel free to reach out:
* GitHub: [${data.github}](https://github.com/${data.github})
* Email: ${data.email}
`;
}

module.exports = generateMarkdown;