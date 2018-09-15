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

const filterOutExistingPropeties = () => {
    const bees =  requiredProperties.reduce((init, current) => {
        if(!process.env[current.name]) {
            init.push(current);
            return init;
        }
    }, []);
    return bees;
}

const getRequiredProps = () => {
    return requiredProperties.reduce((init, current) => {init.push(process.env[current.name]); return init}, []);
};

new Promise((resolve, reject) => {
    const missingProperties = filterOutExistingPropeties();
    if (!missingProperties) {
        console.log('there are no missing properties');
        resolve();
    };
    prompt.start();

    prompt.get(missingProperties, (err, result) => {
        if(err) {
            console.log('it done a wrong', err);
            reject(1);
        }
        for(var key in result) {
            process.env[key] = result[key];
        }
        resolve(result);
    });
}).then(result => {
    console.log('all the details are', getRequiredProps(), result);
    }
);
