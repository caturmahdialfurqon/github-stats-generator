// MIT License

// Copyright (c) 2024 Furqonflynn

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const axios = require('axios');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getUsernameFromFile = () => {
    if (fs.existsSync('GithubUsername.json')) {
        const data = fs.readFileSync('GithubUsername.json', 'utf8');
        return JSON.parse(data).username;
    }
    return null;
};

const saveUsernameToFile = (username) => {
    fs.writeFileSync('GithubUsername.json', JSON.stringify({ username }));
};

const promptForUsername = () => {
    const savedUsername = getUsernameFromFile();
    if (savedUsername) {
        return Promise.resolve(savedUsername);
    } else {
        return new Promise((resolve) => {
            rl.question('UsernameGithub: Enter your Github Username: ', (username) => {
                saveUsernameToFile(username);
                resolve(username);
            });
        });
    }
};

async function AddGithubUsername() {
    if (fs.existsSync('GithubUsername.json')) {
        console.log(color.green + 'You have already set up a username' + color.reset);
        rl.question(color.yellow + 'Do you want to Change The Username? (y/n)?' + color.reset, async (answer) => {
            if (answer.toLowerCase() === 'y') {
                await changeGithubUsername();
            } else {
                const UsernameGithub = await promptForUsername();
                continueOrExit();
            }
        });
    } else {
        const UsernameGithub = await promptForUsername();
        console.log(color.green + 'Github username Added successfully' + color.reset);
        continueOrExit();
    }
}

async function DeleteGithubUsername() {
    fs.unlink('GithubUsername.json', (err) => {
        if (err) {
            console.log(color.green + '\nYou havent set up a username yet\n' + color.reset);
            continueOrExit();
            return;
        }
        console.log(color.green + 'Github username deleted successfully' + color.reset);
        continueOrExit();
    });
}

function banner() {
    console.log(`
╭━━━╮╱╱╱╱╱╱╱╱╱╱╱╱╱╭━━━┳╮${color.yellow}Github${color.green}
┃╭━━╯╱╱╱╱╱╱╱╱╱╱╱╱╱┃╭━━┫┃${color.blue}Profile${color.green}
┃╰━━┳╮╭┳━┳━━┳━━┳━╮┃╰━━┫┃╭╮╱╭┳━╮╭━╮
┃╭━━┫┃┃┃╭┫╭╮┃╭╮┃╭╮┫╭━━┫┃┃┃╱┃┃╭╮┫╭╮╮
┃┃╱╱┃╰╯┃┃┃╰╯┃╰╯┃┃┃┃┃╱╱┃╰┫╰━╯┃┃┃┃┃┃┃
╰╯╱╱╰━━┻╯╰━╮┣━━┻╯╰┻╯╱╱╰━┻━╮╭┻╯╰┻╯╰╯
╱╱╱╱╱╱╱╱╱╱╱┃┃╱╱╱╱╱╱╱╱╱╱╱╭━╯┃${color.red}Readme${color.reset}
╱╱╱╱╱╱╱╱╱╱╱╰╯╱╱╱╱╱╱╱╱╱╱╱╰━━╯${color.green}Maker${color.reset}
        `);
}

const color = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    underLine: '\x1b[4m',
    reset: '\x1b[0m'
};

const languages = [];
const baseurl = "https://readme-typing-svg.demolab.com";

const themes = [
    "dark","radical","merko","gruvbox",
    "tokyonight","onedark","cobalt","synthwave",
    "highcontrast","dracula","transparent","neon",
    "shadow_green","shadow_red","shadow_blue","great-gatsby",
    "gotham","chartreuse-dark","maroongold","kacho_ga",
    "github_dark","moltack","blue_navy","ambient_gradient",
    "calm_pink"
];

const sthemes = [
    "default","dark","highcontrast","transparent","radical",
    "merko","gruvbox","tokyonight","onedark","dracula",
    "shades-of-purple","vue-dark","blue-green","great-gatsby","vision-friendly-dark",
    "midnight-purple","react","blueberry","dark-smoky","javascript-dark"
];

const langcard = [
    "compact","donut","donut-vertical","pie"
];

const fonts = [
    "Times New Roman Bold", "Baskerville", "Bodoni",
    "Impact", "Helvetica", "Futura",
    "Brush Script", "Vivaldi", "Pacifico",
    "Blackletter", "Copperplate", "Comic Sans"
];

const colors = {
    "#000000": "Black",
    "#FFFFFF": "White",
    "#FF0000": "Red",
    "#00FF00": "Green",
    "#0000FF": "Blue",
    "#FFFF00": "Yellow",
    "#00FFFF": "Cyan",
    "#FF00FF": "Magenta"
};

const checkIcon = async (language) => {
  const url = `https://github.com/caturmahdialfurqon/Icon-langs-and-socials/blob/main/src/Langs/${language}/${language}-original.svg`;
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(color.red + "Icon not found." + color.reset);
    }
    return false;
  }
};

const askForLanguage = async () => {
  rl.question(color.yellow + 'Enter programming language (or type "done" to end): ' + color.reset, async (input) => {
    const language = input.toLowerCase();
    if (language === 'done') {
      saveFile();
      return;
    }

    const exists = await checkIcon(language);
    if (exists) {
      languages.push(language);
    }
    askForLanguage();
  });
};

const saveFile = () => {
  const output = '\n\n## 🛠️ Languages :\n\n<div>\n' + languages.map(language => 
    `  <img src="https://github.com/caturmahdialfurqon/Icon-langs-and-socials/blob/main/src/Langs/${language}/${language}-original.svg" title="${language}" alt="${language}" width="40" height="40"/>&nbsp;`
  ).join('\n') + '\n</div>\n\n';
  console.clear();
  //console.log(output);
  const data = fs.readFileSync('readme.md', 'utf8');
  const newContent = data + output;
  fs.writeFileSync('readme.md', newContent);
  console.log(color.green + "The language list is successfully saved in the readme.md file." + color.reset);
  continueOrExit();
};

const typingApp = () => {
    if (!fs.existsSync('readme.md')) {
        fs.writeFileSync('readme.md', '');
    }
    console.log(color.green + '\nTyping Text Setting Section\n' + color.reset);
    console.log(color.blue + `Font Choice:` + color.reset);
    fonts.forEach((font, index) => {
        console.log(`${index + 1}: ${font}`);
    });
    console.log(color.yellow + `Enter the number of fonts Or Enter the font names manually:`+ color.reset);

    rl.question('Your choice: ', fontChoice => {
        let font;
        if (fontChoice >= 1 && fontChoice <= fonts.length) {
            font = fonts[fontChoice - 1].replace(/ /g, '+');
        } else {
            font = fontChoice.replace(/ /g, '+');
        }

        console.log(color.blue + `\nCommon Color: `+ color.reset);
        Object.keys(colors).forEach((color, index) => {
            console.log(`${index + 1}: ${colors[color]} (${color})`);
        });
        console.log(color.yellow + `Enter the number of Color Or Enter the color code manually: `+ color.reset);

        rl.question('Your choice: ', colorChoice => {
            let inputcolor;
            if (colorChoice >= 1 && colorChoice <= Object.keys(colors).length) {
                inputcolor = Object.keys(colors)[colorChoice - 1].slice(1);
            } else {
                inputcolor = colorChoice.startsWith('#') ? colorChoice.slice(1) : colorChoice;
            }

            rl.question(color.yellow + '\nEnter size (default 20): ' + color.reset, size => {
                const inputsize = size || 20;
                console.log(color.blue + '\n(1 for true, 0 for false)\n' + color.reset);
                rl.question(color.yellow + 'Center (Horizontally Centered): '+ color.reset, center => {
                    const centersetting = center === '1' ? 'true' : 'false';

                    rl.question(color.yellow + 'VCenter (Vertically Centered): '+ color.reset, vcenter => {
                        const vcentersetting = vcenter === '1' ? 'true' : 'false';

                        rl.question(color.yellow + 'Multiline (Each sentence on a new line): '+ color.reset, multiline => {
                            const multilineSetting = multiline === '1' ? 'true' : 'false';

                            rl.question(color.yellow + 'Enter Text lines (for newline add with xx): '+ color.reset, lines => {
                                const inputlines = lines
                                    .replace(/ /g, '+')
                                    .replace(/,/g, '%2C')
                                    .replace(/xx/g, ';');

                                const result = `\n\n## Typing Text\n\n[![Typing SVG](${baseurl}?font=${font}&size=${inputsize}&pause=1000&color=${inputcolor}&center=${centersetting}&vCenter=${vcentersetting}&multiline=${multilineSetting}&width=435&lines=${inputlines})](https://git.io/typing-svg)\n\n`;
                                console.log(result);
                                console.clear();
                                const data = fs.readFileSync('readme.md', 'utf8');
                                const newContent = data + result;
                                fs.writeFileSync('readme.md', newContent);
                                console.log(color.green + "The Typing Text is successfully saved in the readme.md file." + color.reset);
                                continueOrExit();
                            });
                        });
                    });
                });
            });
        });
    });
};

const githubstats = async () => {
    if (!fs.existsSync('readme.md')) {
        fs.writeFileSync('readme.md', '');
    }
    const UsernameGithub = await promptForUsername();

    console.log(color.yellow + `UsernameGithub:` + color.blue + `${UsernameGithub}` + color.reset);
    console.log('\nGithub Stats Section\n');
    console.log(color.blue + `themes Choice:` + color.reset);
    themes.forEach((theme, index) => {
        console.log(`${index + 1}: ${theme}`);
    });
    rl.question('Choose a theme for stats: ', (Chosenthemestats) => {
        let selectedTheme;
        if (Chosenthemestats >= 1 && Chosenthemestats <= themes.length) {
            selectedTheme = themes[Chosenthemestats - 1];
        } else {
            selectedTheme = themes[0];
        }
        console.log(color.blue + '\n(1 for true, 0 for false)\n' + color.reset);
        rl.question('Show icon (true/false): ', (showiconsetting) => {
            const showicon = showiconsetting === 'true' ? 'true' : 'false';
            const result = (`\n## GitHub Stats:\n\n[![${UsernameGithub} GitHub stats](https://github-readme-stats.vercel.app/api?username=${UsernameGithub}&show_icons=${showicon}&theme=${selectedTheme})](https://github.com/anuraghazra/github-readme-stats)\n\n`);
            console.log(result);
            const data = fs.readFileSync('readme.md', 'utf8');
            const newContent = data + result;
            fs.writeFileSync('readme.md', newContent);
            console.clear();
            console.log(color.green + "The githubstats is successfully saved in the readme.md file." + color.reset);
            continueOrExit();
        });
    });
};

const forgithubpin = () => {
    rl.question("Do you want to add more Github Repo Pin Card (y/n)? ", (answer) => {
        if (answer.toLowerCase() === 'y') {
            githubpin();
        } else {
            continueOrExit();
        }
    });
};

const githubpin = async () => {
    if (!fs.existsSync('readme.md')) {
        fs.writeFileSync('readme.md', '');
    }
    const UsernameGithub = await promptForUsername();

    console.log(color.yellow + `UsernameGithub:` + color.blue + `${UsernameGithub}` + color.reset);
    console.log('\nGithub Repo Pin Card Section\n');
    console.log(color.blue + '\n(1 for true, 0 for false)\n' + color.reset);
    rl.question('Show owner (true/false): ', (showownersetting) => {
        const showowner = showownersetting === 'true' ? 'true' : 'false';
        console.log(color.blue + `themes Choice:` + color.reset);
        themes.forEach((theme, index) => {
            console.log(`${index + 1}: ${theme}`);
        });
        rl.question('Choose a theme for pins Card: ', (Chosenthemepins) => {
            let selectedTheme;
            if (Chosenthemepins >= 1 && Chosenthemepins <= themes.length) {
                selectedTheme = themes[Chosenthemepins - 1];
            } else {
                selectedTheme = themes[0];
            }
            rl.question('GitHub repo: ', (githubrepo) => {
                const result = (`\n## GitHub Repo Pin Card:\n\n[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=${UsernameGithub}&show_owner=${showowner}&theme=${selectedTheme}&repo=${githubrepo})](https://github.com/anuraghazra/github-readme-stats)\n\n`);
                //console.log(result);
                const data = fs.readFileSync('readme.md', 'utf8');
                const newContent = data + result;
                fs.writeFileSync('readme.md', newContent);
                console.clear();
                console.log(color.green + "The githubpin is successfully saved in the readme.md file." + color.reset);
                forgithubpin();
            });
        });
    });
};

const toplang = async () => {
    if (!fs.existsSync('readme.md')) {
        fs.writeFileSync('readme.md', '');
    }
    const UsernameGithub = await promptForUsername();

    console.log(color.yellow + `UsernameGithub:` + color.blue + `${UsernameGithub}` + color.reset);
    console.log('\nGithub TopLangs Card Section\n');
    console.log(color.blue + `themes Choice:` + color.reset);
    themes.forEach((theme, index) => {
        console.log(`${index + 1}: ${theme}`);
    });
    rl.question('Choose a theme for Toplang card: ', (langthemepins) => {
        let selectedTheme;
        if (langthemepins >= 1 && langthemepins <= themes.length) {
            selectedTheme = themes[langthemepins - 1];
        } else {
            selectedTheme = themes[0];
        }
        console.log(color.blue + `themes lang Choice:` + color.reset);
        langcard.forEach((lang, index) => {
            console.log(`${index + 1}: ${lang}`);
        });
        rl.question('Choose a Toplang card type: ', (chosenlangcard) => {
            let selectedLangCard;
            if (chosenlangcard >= 1 && chosenlangcard <= langcard.length) {
                selectedLangCard = langcard[chosenlangcard - 1];
            } else {
                selectedLangCard = langcard[0];
            }
            console.log(color.blue + '\n(1 for true, 0 for false)\n' + color.reset);
            rl.question('Hide progress (true/false): ', (hideprogresssetting) => {
                const hideprogress = hideprogresssetting === 'true' ? 'true' : 'false';
                const result = (`\n## Top Langs:\n\n[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${UsernameGithub}&layout=${selectedLangCard}&theme=${selectedTheme}&hide_progress=${hideprogress})](https://github.com/anuraghazra/github-readme-stats)\n\n`);
                console.log(result);
                const data = fs.readFileSync('readme.md', 'utf8');
                const newContent = data + result;
                fs.writeFileSync('readme.md', newContent);
                console.clear();
                console.log(color.green + "The ToplangStats is successfully saved in the readme.md file." + color.reset);
                continueOrExit();
            });
        });
    });
};

const githubstreak = async () => {
    if (!fs.existsSync('readme.md')) {
        fs.writeFileSync('readme.md', '');
    }
    const UsernameGithub = await promptForUsername();

    console.log(color.yellow + `UsernameGithub:` + color.blue + `${UsernameGithub}` + color.reset);
    console.log('\nGithub Streak Card Section\n');
    console.log(color.blue + `themes Choice:` + color.reset);
    sthemes.forEach((stheme, index) => {
        console.log(`${index + 1}: ${stheme}`);
    });
    rl.question('Choose a theme for stats: ', (StreakTheme) => {
        let selectedTheme;
        if (StreakTheme >= 1 && StreakTheme <= sthemes.length) {
            selectedTheme = sthemes[StreakTheme - 1];
        } else {
            selectedTheme = sthemes[0];
        }
        console.log(color.blue + '\n(1 for true, 0 for false)\n' + color.reset);
        rl.question('hideborder (true/false): ', (hidebordersetting) => {
            const hideborder = hidebordersetting === 'true' ? 'true' : 'false';
            const result = (`\n## GitHub Streak:\n\n[![GitHub Streak](https://streak-stats.demolab.com?user=${UsernameGithub}&theme=${selectedTheme}&hide_border=${hideborder})](https://git.io/streak-stats)\n\n`);
            console.log(result);
            const data = fs.readFileSync('readme.md', 'utf8');
            const newContent = data + result;
            fs.writeFileSync('readme.md', newContent);
            console.clear();
            console.log(color.green + "The githubstats is successfully saved in the readme.md file." + color.reset);
            continueOrExit();
        });
    });
};

function continueOrExit() {
    rl.question('Do you want to continue using the script? (y/n): ', (answer) => {
        if (answer.toLowerCase() === 'y') {
            console.clear();
            banner();
            mainMenu();
        } else {
            console.clear();
            console.log(`${color.green}Thank you!${color.reset}`);
            console.log(color.red + 'Exiting...' + color.reset);
            rl.close();
        }
    });
}

const mainMenu = () => {
    console.log(color.blue + 'Choose an option:' + color.reset);
    console.log('1: Typing Text');
    console.log('2: GitHub Stats');
    console.log('3: Github Streak');
    console.log('4: Github TopLangs');
    console.log('5: GitHub Repo pin Card');
    console.log('6: Languages Proficient - Skill ');
    console.log('7: Add Github Username');
    console.log('8: Delete Github Username');
    console.log(color.reset + `9: ` + color.red + `Exit` + color.reset);
    rl.question(color.yellow + 'Your choice: ' + color.reset, choice => {
        switch (choice) {
            case '1':
                typingApp();
                break;
            case '2':
                githubstats();
                break;
            case '3':
                githubstreak();
                break;
            case '4':
                toplang();
                break;
            case '5':
                githubpin();
                break;
            case '6':
                console.log('\nLanguage Skills Section\n');
                askForLanguage();
                break;
            case '7':
                AddGithubUsername();    
                break;
            case '8':
                DeleteGithubUsername();   
                break;
            case '9':
                console.clear();
                console.log(`${color.green}Thank you!${color.reset}`);
                console.log(color.red + 'Exiting...' + color.reset);
                rl.close();
                break;
            default:
                console.log(color.red + 'Invalid choice. Please try again.' + color.reset);
                mainMenu();
        }
    });
};

console.clear();
banner();
mainMenu();

