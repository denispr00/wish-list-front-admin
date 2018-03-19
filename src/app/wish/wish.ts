export class Wish {
    id: number;
    title: string;
    description: string;
    creationDate: Date;
    creationUser: string;
    completedDate: Date;
    completedUser: string;
    viewDate: Date;
    viewUser: string;
    complete: boolean = false;

    constructor(values: Object = {}){
        Object.assign(this, values);
        
    }

}
