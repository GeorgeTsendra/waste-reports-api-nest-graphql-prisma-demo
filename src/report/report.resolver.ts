import {
  Args,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Context,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { Report } from './entities/report.entity';
import { ReportService } from './report.service';
import { CreateReportInput } from './dto/create-report.input';
import { UpdateReportStatusInput } from './dto/update-status.input';

@ObjectType()
class PageInfo {
  @Field({ nullable: true }) endCursor?: string | null;
  @Field() hasNextPage!: boolean;
}

@ObjectType()
class ReportEdge {
  @Field(() => Report) node!: Report;
  @Field() cursor!: string;
}

@ObjectType()
class ReportConnection {
  @Field(() => [ReportEdge]) edges!: ReportEdge[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}

@Resolver(() => Report)
export class ReportResolver {
  constructor(private service: ReportService) {}

  @Query(() => Report, { nullable: true })
  report(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Query(() => ReportConnection)
  reports(
    @Args('first', { type: () => Int, nullable: true }) first?: number,
    @Args('after', { type: () => String, nullable: true }) after?: string,
  ) {
    return this.service.list(first ?? 20, after);
  }

  @Mutation(() => Report)
  createReport(@Args('input') input: CreateReportInput, @Context() ctx: any) {
    if (!ctx.user) throw new Error('Unauthorized');
    return this.service.create(input, ctx.user.id);
  }

  @Mutation(() => Report)
  updateReportStatus(
    @Args('input') input: UpdateReportStatusInput,
    @Context() ctx: any,
  ) {
    if (!ctx.user || ctx.user.role !== 'MANAGER') throw new Error('Forbidden');
    return this.service.updateStatus(input.id, input.status);
  }
}
