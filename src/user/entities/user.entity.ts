import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from 'generated/prisma';

registerEnumType(Role, { name: 'Role' });

@ObjectType()
export class User {
  @Field(() => ID) id: string;
  @Field() email: string;
  @Field(() => Role) role: Role;
  @Field() createdAt: Date;
}
