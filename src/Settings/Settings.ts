const LOCAL_ADDRESS = "http://localhost:5010";
const PRODUCTION_ADDRESS = "Production url of pur server";
export const devEnv = "development";
export const serverAddress = devEnv ? LOCAL_ADDRESS : PRODUCTION_ADDRESS;
