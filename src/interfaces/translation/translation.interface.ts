export interface IUpdateKeysTranslatePayload {
    language: string
    project: string
    module: string
    keys: Array<IKeysTranslation>
}

export interface IKeysTranslation {
    key: string
    value: string
}