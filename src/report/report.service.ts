import { Injectable } from '@nestjs/common';
import { Base64PdfDto } from './dto/base64-pdf.dto';
import { readFile, unlinkSync, writeFileSync } from 'fs';
import { fromPath } from 'pdf2pic';
import { promisify } from 'util';

@Injectable()
export class ReportService {
  async convertPdfToImage(base64PdfDto: Base64PdfDto) {
    try {
      const readFileAsync = promisify(readFile);
      const pdfBuffer = Buffer.from(base64PdfDto.base64, 'base64');
      const pdfPath = 'temp.pdf';

      writeFileSync(pdfPath, pdfBuffer);

      const outputPath = 'output';
      const converter = fromPath(pdfPath, {
        density: 300,
        saveFilename: 'output',
        savePath: outputPath,
        format: 'png',
        width: 800,
        height: 1200,
      });

      await converter(1);

      const imagePath = `output/output.1.png`;
      const imageBuffer = await readFileAsync(imagePath);
      const imageBase64 = imageBuffer.toString('base64');

      unlinkSync(pdfPath);
      unlinkSync(imagePath);

      return { base64Image: imageBase64 };
    } catch (error) {
      console.log('Ocorreu um erro ao gerar a imagem -> ', error);
      return { base64Image: undefined };
    }
  }
}
