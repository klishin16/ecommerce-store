import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { StorageModule } from "../storage/storage.module";

@Module({
    imports: [StorageModule],
    controllers: [FilesController],
    providers: [FilesService]
})
export class FilesModule {
}
