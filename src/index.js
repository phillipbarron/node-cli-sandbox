const prompt = require('prompt');

const requiredProperties = [
    {
        name: 'username'
    },
    {
        name: 'password',
        hidden: true,
        replace: '*'
    }
];

new Promise((resolve, reject) => {
    prompt.start();
    prompt.get(requiredProperties, (err, result) => {
        if(err) {
            console.log('it done a wrong', err);
            reject(1);
        }
        resolve(result);
    });
}).then(userDetails => {
    console.log('all the details are', userDetails);
    console.log('I do not want this to execute till after input');    
});
