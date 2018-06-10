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
}
declare let studentHomoAssoc: Students;
