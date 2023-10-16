import { Body, Controller, Get, Post } from '@nestjs/common';
import { SettingsService } from "./settings.service";
import { SaveSettingsDto } from "./dto/save-settings.dto";

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {
    }

    @Get()
    getSettings() {
        return this.settingsService.getSettings()
    }

    @Post('save')
    saveSettings(@Body() saveSettingsDto: SaveSettingsDto) {
        return this.settingsService.save(saveSettingsDto);
    }
}
