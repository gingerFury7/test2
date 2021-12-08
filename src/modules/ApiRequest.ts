import axios from 'axios'
import { BodyFormData, GetPumpsStateModel } from './ApiModels'

export function GetPumps(): Promise<Number[]>{
    const body: BodyFormData = {
        UniqueRequestId: 'string',
        Method: 'Unknown',
        Data: {}
    };
    return axios
        .post('https://dev.ekagroup.local:7472/GetPumps', body)
        .then(response =>{
            const PumpNumber = response.data;
            return PumpNumber.Data.PumpsData.PumpNumbers;
        })
        .catch(e => {
            console.log(e);
        });
    }

export function GetPumpsState(PumpNumber: Array<Number>): Promise<GetPumpsStateModel> {
    const body: BodyFormData = {
        UniqueRequestId: 'string',
        Method: 'Unknown',
        Data: {
            PumpNumbers: PumpNumber,
        }
    }
    return axios
        .post('https://dev.ekagroup.local:7472/GetPumpsState', body)
        .then(response =>{
            const PumpsState = response.data;
            return PumpsState;
        })
        .catch(e => {
            console.log(e);
        });

}

