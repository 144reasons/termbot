const prompts = require('prompts');
const fs = require('fs')
const path = require('path')

try {
    fs.accessSync(path.join(__dirname, './config.json'));
    console.log('You already have a config ready!')
} catch (e) {
    const questions = [
        {
            type: 'text',
            name: 'botname',
            message: 'What\'s your bot\'s name?'
        },
        {
            type: 'text',
            name: 'token',
            message: 'What\'s your bot\'s token?'
        },
        {
            type: 'text',
            name: 'prefix',
            message: 'What\'s your bot\'s prefix?'
        },
        {
            type: 'text',
            name: 'owner',
            message: 'What\'s your ID?'
        },
        {
            type: 'text',
            name: 'errorchannelID',
            message: 'What\'s your error log channel ID?'
        },
        {
            type: 'select',
            name: 'botColour',
            message: 'What\'s the bots colourtheme?',
            choices: [
                { title: 'Red', value: '#b80000' },
                { title: 'Green', value: '#00FF00' },
                { title: 'Blue', value: '#0000FF' },
                { title: 'Orange', value: '#FFA500' },
                { title: 'Pink', value: '#FFC0CB' },
                { title: 'Purple', value: '#800080' },
              ]
        }
    ]
    prompts(questions).then(values => {
        fs.writeFileSync(path.join(__dirname, './config.json'), JSON.stringify(JSON.parse(JSON.stringify(values)),null,2));
    });
}
