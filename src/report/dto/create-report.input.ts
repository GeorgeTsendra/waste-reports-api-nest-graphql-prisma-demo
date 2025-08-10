import { Field, Float, InputType } from '@nestjs/graphql';
import { ReportType } from 'generated/prisma';

@InputType()
export class CreateReportInput {
  @Field(() => ReportType) type: ReportType;
  @Field() title: string;
  @Field(() => Float) lat: number;
  @Field(() => Float) lng: number;
}
