import {IPerson} from "./IPerson";

export interface ITimeEntry {
    _id?: string
    timeStarted: Date;
    timeEnded?: Date;
    _person: IPerson;
    timedOut?: boolean;
}
