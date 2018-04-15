export class Event {
    name: string;
    location?: string;
    comments?: Array<string> = new Array();
    ownerId?: string;
    contacts?: string;
}