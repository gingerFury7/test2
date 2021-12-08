export const BaseURL = 'https://dev.ekagroup.local:7472/'

export interface GetPumpsModel {
    Result:{
        ResultCode: string,
        ResultMessage: string,
    }
    Data:{
        PumpsData:{
            PumpNumbers: Array<Number>
        }
        ActivePumpNumber: number;
    }
}

export interface GetPumpsStateModel {
    Result:{
        ResultCode: string;
        ResultMessage: string;
    }
    Data: {
        PumpsData: [{
            PumpNumber: number;
            PumpState: string;
            IsPumpAvailableForPreselect: boolean;
            PumpFlags: number;
            Nozzles:{
                Items:[{
                    NozzleNumber: number;
                    IzNozzleEnabled: boolean;
                    IsNozzleUp: boolean;
                    NozzleFuel:{
                        DevCode: number;
                        BasePrice: number;
                        Name: string;
                        ExtraName: string;
                    }
                }]
            }
            Attached: {
                TransactionId: number;
                PresselMode: string;
                PresselPrice: number;
                PresselDose: number;
                PreselProductDevCode: number;
                FillingPrice: number;
                FillingVolume: number;
                FillingSum: number;
            }
        }]
    }
}

export interface BodyFormData{
    UniqueRequestId: string,
    Method: string,
    Data: {}
}