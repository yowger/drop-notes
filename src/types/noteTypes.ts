import { TStatus } from "./statusTypes"

export interface INote {
    id: string
    title: string
    description: string
    status: TStatus
}
