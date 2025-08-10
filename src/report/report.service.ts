import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  findOne(id: string) {
    return this.prisma.report.findUnique({ where: { id } });
  }

  async list(first = 20, after?: string) {
    const take = Math.min(first, 50);
    const cursor = after ? { id: after } : undefined;
    const rows = await this.prisma.report.findMany({
      take,
      ...(cursor && { skip: 1, cursor }),
      orderBy: { createdAt: 'desc' },
      include: { createdBy: true },
    });
    const endCursor = rows.at(-1)?.id ?? null;
    const hasNextPage =
      !!endCursor &&
      (await this.prisma.report.count({
        where: { createdAt: { lt: rows.at(-1)!.createdAt } },
      })) > 0;

    return {
      edges: rows.map((r) => ({ node: r, cursor: r.id })),
      pageInfo: { endCursor, hasNextPage },
    };
  }

  create(
    input: { type: any; title: string; lat: number; lng: number },
    userId: string,
  ) {
    return this.prisma.report.create({
      data: {
        type: input.type,
        title: input.title,
        coords: { lat: input.lat, lng: input.lng },
        createdById: userId,
      },
      include: { createdBy: true },
    });
  }

  updateStatus(id: string, status: any) {
    return this.prisma.report.update({
      where: { id },
      data: { status },
      include: { createdBy: true },
    });
  }
}
