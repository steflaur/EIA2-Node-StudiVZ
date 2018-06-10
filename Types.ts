interface AssocStringString {
    [key: string]: string;
}

interface Students {
        [matrikel: string]: StudentData;
    }

interface StudentData {
    name: string;
    firstname: string;
    studies: string;
    matrikel: number;
    age: number;
    //gender: boolean;
}

let studentHomoAssoc: Students = {};