import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { User } from '../../user/entities/user.entity';
import { ReportType, Status } from 'generated/prisma';

registerEnumType(Status, { name: 'Status' });
registerEnumType(ReportType, { name: 'ReportType' });

@ObjectType()
export class Report {
  @Field(() => ID) id: string;
  @Field(() => ReportType) type: ReportType;
  @Field() title: string;
  @Field(() => GraphQLJSON) coords: any;
  @Field(() => Status) status: Status;
  @Field() createdAt: Date;
  @Field(() => User) createdBy: User;
}
