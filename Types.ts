interface AssocStringString {
    [key: string]: string;
}

interface StudentData {
    name: string;
    firstname: string;
    studies: string;
    matrikel: number;
    age: number;
}

interface Students {
        [matrikel: string]: StudentData;
    }

let studentHomoAssoc: Students = {};