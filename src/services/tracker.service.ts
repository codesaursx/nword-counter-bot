import { PrismaClient } from '@prisma/client';

class TrackerService {
  prisma = new PrismaClient();
  async findOne(userId: string, guildId: string) {
    await this.prisma.$connect();

    const data = await this.prisma.countTracker.findUnique({
      where: { userId_guildId: { userId, guildId } }
    });

    await this.prisma.$disconnect();

    return data;
  }

  async upsert(userId: string, guildId: string, count: number) {
    const data = await this.findOne(userId, guildId);

    let record;
    if (data) {
      record = await this.prisma.countTracker.update({
        where: { userId_guildId: { userId, guildId } },
        data: { count: data.count + count }
      });
    } else {
      record = await this.prisma.countTracker.create({
        data: { userId, guildId, count }
      });
    }

    return record;
  }
}

export default new TrackerService();
