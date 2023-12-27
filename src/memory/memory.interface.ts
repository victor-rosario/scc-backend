export type TypeMemoryValue = string | ObjectI | undefined

export interface MemoryClassInterface {

    set(key: string, value: TypeMemoryValue): Promise<void>

    get<T = TypeMemoryValue>(key: string): Promise<T>

    getAll(): Promise<Array<TypeMemoryValue>>

    keys(): Promise<Array<string>>

    remove(key: string): Promise<void>
}