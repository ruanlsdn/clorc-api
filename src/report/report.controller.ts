import { Body, Controller, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { Base64PdfDto } from './dto/base64-pdf.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('convert-pdf-to-image')
  async convertPdfToImage(@Body() base64PdfDto: Base64PdfDto) {
    return await this.reportService.convertPdfToImage(base64PdfDto);
  }
}
