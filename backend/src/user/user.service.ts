import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as paypal from '@paypal/checkout-server-sdk';
import { TransactionService } from 'src/transaction/transaction.service';
import { User } from 'src/user/entities/user.entity';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  private payPalClient: any;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private transactionService: TransactionService,
  ) {
    const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
    this.payPalClient = new paypal.core.PayPalHttpClient(
      new paypal.core.SandboxEnvironment(
        PAYPAL_CLIENT_ID ?? '',
        PAYPAL_CLIENT_SECRET ?? '',
      ),
    );
  }

  create(user: DeepPartial<User>) {
    return this.userRepository.save(user);
  }

  async findOne(options: string | FindOneOptions<User>) {
    if (typeof options === 'string') {
      return this.userRepository.findOne({ where: { id: options } });
    } else {
      return this.userRepository.findOne(options);
    }
  }

  async addAmount(orderId: string, userId: string) {
    const user = await this.findOne({
      where: { id: userId },
      relations: { referrer: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const request = new paypal.orders.OrdersGetRequest(orderId);

    const response = await this.payPalClient.execute(request);
    const amount = parseFloat(response.result.purchase_units[0].amount.value);

    await this.transactionService.create({
      orderId,
      status: response.result.status,
      amount: amount,
      userId: user.id,
    });

    await this.userRepository.update(user.id, {
      balance: user.balance + amount,
    });

    if (user.referrer) {
      await this.userRepository.update(user.referrer.id, {
        balance: user.referrer.balance + amount * 0.1,
      });
    }
  }

  async removeFromBalance(userId: string, amount: number) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }

    return this.userRepository.update(user.id, {
      balance: user.balance - amount,
    });
  }
}
