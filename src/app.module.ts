import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'), // code-first
      sortSchema: true,
      playground: false,
      plugins: [], // Apollo Sandbox
      context: ({ req }) => ({ req }),
    }),

    UserModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
