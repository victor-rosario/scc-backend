import { MemoryClassInterface, TypeMemoryValue } from "./memory.interface";

export class LocalMemory implements MemoryClassInterface {

    private memory = new Map<string, any>()

    set(key: string, value: TypeMemoryValue): Promise<void> {
        this.memory.set(key, value)
        return Promise.resolve()
    }
    get<T = TypeMemoryValue>(key: string): Promise<T> {
        return Promise.resolve<T>(this.memory.get(key))
    }
    getAll(): Promise<TypeMemoryValue[]> {
        return Promise.resolve(Array.from(this.memory.values()))
    }
    keys(): Promise<string[]> {
        return Promise.resolve(Array.from(this.memory.keys()))
    }
    remove(key: string): Promise<void> {
        this.memory.delete(key)
        return Promise.resolve()
    }
}