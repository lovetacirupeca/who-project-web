export class Event {
    id: string;
    name: string;
    location?: string;
    comments?: Array<string> = new Array();
    ownerId?: string;
    contacts?: Array<string> = new Array();
}