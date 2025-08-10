import { Module } from '@nestjs/common';
import { ReportResolver } from './report.resolver';
import { ReportService } from './report.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ReportResolver, ReportService, PrismaService],
})
export class ReportModule {}
