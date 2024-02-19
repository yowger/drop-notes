import { STATUS } from "../constants/status"

type ObjectValues<T> = T[keyof T]

export type TStatus = ObjectValues<typeof STATUS>
