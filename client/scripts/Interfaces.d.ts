declare namespace A06_studiVZ {
    interface Studi {
        name: string;
        firstname: string;
        studies: string;
        matrikel: number;
        age: number;
        gender: boolean;
    }
    interface Studis {
        [matrikel: string]: Studi;
    }
    let studiSimpleArray: Studi[];
    let studiHomoAssoc: Studis;
}
