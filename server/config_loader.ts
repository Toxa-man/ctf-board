import path from "path"
import merge from "deepmerge"
import argv from './args'

type Config = {
    mongoDB: string,
    mongoUsername: string,
    mongoPassword: string,
    jwtSecret: string,
    httpPort: number,
    https: boolean,
    privateKey: string,
    certificate: string,
    webhookSecret: string
}

/**
 * Loads config from path supplied via --cfg parameter and merges it with default.json config
 * @returns merged config
 */
export function loadConfig(pathToFile?: string): Config {
    const defaultCfg = require(path.join(process.cwd(), "config", "default.json"));
    if (pathToFile) {
        const additionalCfg = require(path.join(process.cwd(), pathToFile));
        const resultCfg = merge(defaultCfg, additionalCfg);
        return resultCfg as Config;
    }
    return defaultCfg;
}

export default loadConfig(argv.config);