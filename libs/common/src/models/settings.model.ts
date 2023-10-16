export enum ESettingsKinds {
    OPTIONAL_FUNCTION = 'optional_function'
}

export interface IOptionalFunctionsSettings {
    isActive: boolean;
}

export interface ISettings<T extends ESettingsKinds> {
    key: string;
    kind: T
    value: IOptionalFunctionsSettings;
}

export interface ISettingsSaveDto {
    settings: ISettings<ESettingsKinds>[]
}

export interface ISettingsSaveResponseData {
    settings: ISettings<ESettingsKinds>[];
}
