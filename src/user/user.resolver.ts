import { Resolver, Query, Context } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private service: UserService) {}
  @Query(() => User, { nullable: true })
  me(@Context() ctx: any) {
    return ctx.user ?? null;
  }
}
