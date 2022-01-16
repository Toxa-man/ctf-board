import yargs from "yargs";

const prepareArgs = (): any => {
    return yargs.option('config', {
        alias: 'c',
        description: 'Config to use wher running app',
        type: 'string'
    })
    .help()
    .alias('help', 'h').argv;
}

export default prepareArgs();


