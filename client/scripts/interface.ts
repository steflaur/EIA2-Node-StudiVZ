namespace A08 {
    
    // Struktur des heterogenen assoziativen Arrays als Datensatz für eine studierende Person
    export interface StudentData {
        name: string;
        firstname: string;
        studies: string;
        matrikel: number;
        age: number;
        //gender: boolean;
    }

    // Struktur des homogenen assoziativen Arrays, bei dem ein Datensatz der Matrikelnummer zugeordnet ist
    export interface Students {
        [matrikel: string]: StudentData;
    }

    // Simples Array zum Speichern der Studi-Datensätze (nur zur Demonstration)
    export let studentSimpleArray: StudentData[] = [];

    // Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
    export let studentHomoAssoc: Students = {};

}