import { Field, ID, InputType } from '@nestjs/graphql';
import { Status } from 'generated/prisma';

@InputType()
export class UpdateReportStatusInput {
  @Field(() => ID) id: string;
  @Field(() => Status) status: Status;
}
