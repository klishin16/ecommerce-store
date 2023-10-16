import { Injectable } from '@nestjs/common';
import { UploadClient } from "@uploadcare/upload-client";
import StorageConfig from "./storage-config";

@Injectable()
export class StorageService {
    private client: UploadClient;
    constructor() {
        this.client = new UploadClient({ publicKey: StorageConfig.uploadcarePublicKey })
    }

    async save(inputFile: Buffer): Promise<string> {
        const file = await this.client.uploadFile(inputFile);
        return file.uuid
    }
}
