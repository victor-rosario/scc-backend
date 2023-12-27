import { MemoryClassInterface, TypeMemoryValue } from "./memory.interface";

export class Memory {

    constructor(private memory: MemoryClassInterface) { }

    public set(key: string, value: TypeMemoryValue) {
        return this.memory.set(key, value)
    }

    public get<T>(key: string) {
        return this.memory.get<T>(key)
    }

    public getAll() {
        return this.memory.getAll()
    }

    public keys() {
        return this.memory.keys()
    }

    public remove(key: string) {
        return this.memory.remove(key)
    }
}