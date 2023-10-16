import { Injectable } from '@nestjs/common';
import { SaveSettingsDto } from "./dto/save-settings.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Settings } from "./entities/settings.entity";
import { Repository } from "typeorm";

@Injectable()
export class SettingsService {
    constructor(@InjectRepository(Settings) private readonly settingsRepository: Repository<Settings>) {
    }

    save(saveSettingsDto: SaveSettingsDto) {
        console.log('saveSettingsDto', saveSettingsDto)
        return this.settingsRepository.save(saveSettingsDto.settings);
    }

    getSettings() {
        return this.settingsRepository.find()
    }
}
