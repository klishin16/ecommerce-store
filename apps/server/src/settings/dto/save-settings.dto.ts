import { ESettingsKinds, ISettings, ISettingsSaveDto } from "@ecommerce-store/common";

export class SaveSettingsDto implements ISettingsSaveDto {
    settings: ISettings<ESettingsKinds>[];
}
