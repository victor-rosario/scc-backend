import { LocalMemory } from "./local-memory";
import { Memory } from "./memory.base";

export const localMemory = new Memory(new LocalMemory())