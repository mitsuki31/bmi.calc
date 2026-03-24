import pkg from "../../package.json";

export const APP_NAME = "bmi-calc";
export const SCRIPT_NAME = "bmi";
export const APP_DESC = "Calculate Body Mass Index (BMI) based on World Health Organization (WHO) standards.";
export const VERSION = pkg.version as `${number}.${number}.${number}`;
