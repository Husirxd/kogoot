import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ImageService {


    async uploadImage(file: any): Promise<string> {
        const filename = `${uuidv4()}${path.extname(file.originalname)}`;
        const filePath = path.join(__dirname, '..','..', 'uploads', filename);
        if (!fs.existsSync(path.join(__dirname, '..', '..', 'uploads'))) {
            fs.mkdirSync(path.join(__dirname, '..','..', 'uploads'));
        }
        try {
            fs.writeFileSync(filePath, file.buffer);
            return filePath;
        } catch (error) {
            console.log(error);
        }
        return null;
    }
}
