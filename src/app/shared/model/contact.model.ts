export class Contact {
    id: string;
    name: string;
    image?: string;
    notes?: Array<string> = new Array();
    job?: string;
    rate?: number;
    categories?: Array<string> = new Array();

    public asFormData(): FormData {
        const data = new FormData();
        data.append('name', this.name);
        data.append('image', this.image);
        data.append('job', this.job);
        for (let notes of this.notes) {
            data.append('notes', notes);
        }
        data.append('rate', String(this.rate));
        for (let categories of this.categories) {
            data.append('categories', categories);
        }

        return data;
    }

}