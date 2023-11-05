import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { ESettingsKinds, ISettings, ISettingsSaveDto, ISettingsSaveResponseData } from "@ecommerce-store/common";


const load = async (): Promise<ISettings<ESettingsKinds>[]> => {
    return axios.get(BACKEND_URL + 'settings', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((response) => response.data)
}

const save = async (payload: ISettingsSaveDto): Promise<ISettingsSaveResponseData> => {
    return axios.post<ISettingsSaveDto>(BACKEND_URL + "settings/save", payload)
};

export const SettingsService = {
    load,
    save
}
