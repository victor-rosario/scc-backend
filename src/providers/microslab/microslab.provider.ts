import Base from "@providers/base";
import { IMicroslabIdentification } from "./microslab.interface";

class MicroslabProvider extends Base {
    constructor() {
        super("https://api.cedulado.microslab.com.do/api")
    }

    idenfitication(identification: string): Promise<IMicroslabIdentification> {
        return this.get(`/cedulado/${identification}`)
    }
}

const microslabProvider = new MicroslabProvider()

export default microslabProvider