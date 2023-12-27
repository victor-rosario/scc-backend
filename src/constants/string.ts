export type LevelCodeType = 'number' | 'string' | 'all' | 'strong' | 'upper';

export const levelCodes: Record<string, string> = {
    number: '0123456789',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    string: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    all: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    strong: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@&*-%$_',
};