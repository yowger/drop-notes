import { NOTE_STATUS } from "../../constants"

type ObjectValues<T> = T[keyof T]
export type TNoteStatus = ObjectValues<typeof NOTE_STATUS>

export interface INote {
    id: string
    title: string
    description: string
    status: TNoteStatus
}
