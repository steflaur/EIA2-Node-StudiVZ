declare namespace A08 {
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
    let studentSimpleArray: StudentData[];
    let studentHomoAssoc: Students;
}
