import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PartsOfContests, User } from '@prisma/client';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class UserService {
  private payPalClient: any;
  constructor(private prisma: PrismaService) {
    this.payPalClient = new paypal.core.PayPalHttpClient(
      new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET,
      ),
    );
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({ where: { email: username } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.prisma.user.findFirst({ where: { id } });
  }

  async getMyTicketsForContestId(
    contestId: number,
    userId: number,
  ): Promise<PartsOfContests[] | undefined> {
    return this.prisma.partsOfContests.findMany({
      where: {
        userId,
        contestId,
      },
    });
  }

  async addAmount(orderId: string, userId: number) {
    const user = await this.findById(userId);
    const request = new paypal.orders.OrdersGetRequest(orderId);

    const response = await this.payPalClient.execute(request);
    const amount = response.result.purchase_units[0].amount;

    await this.prisma.transaction.create({
      data: {
        orderId,
        status: response.result.status,
        amount: amount,
        userId: user.id,
      },
    });

    await this.prisma.user.update({
      data: { balance: user.balance + amount },
      where: { id: userId },
    });

    if (user.referrerCode) {
      const referrer = await this.prisma.user.findFirst({
        where: { referralCode: user.referrerCode },
      });
      if (referrer) {
        await this.prisma.user.update({
          data: { balance: referrer.balance + amount * 0.1 },
          where: { id: referrer.id },
        });
      }
    }
  }
}
