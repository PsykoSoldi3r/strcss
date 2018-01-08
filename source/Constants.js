import { constants } from './Utseende';

export default class Constants {
    static set (newConstants) {
        for (var newConstantKey in newConstants) {
            constants[newConstantKey] = newConstants[newConstantKey]
        }
    }
}