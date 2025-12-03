export interface Contract {
    id: number;
    StartDate: string;
    EndDate: string;
    idClient: number;
    idCar: number;
    createdAt: string;
    updatedAt: string;
}

export interface ContractAdminView {
    EndDate: string,
    StartDate: string,
    createdAt: string,
    id: number,
    Car: string,
    Client: string,
    updatedAt: string
}
