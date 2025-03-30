import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@supabase/supabase-js';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type AuthenticatedRequest = Request & {
  user: Omit<User, 'id'> & { sub: User['id'] };
};

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: any): Promise<any> {
    return payload;
  }

  authenticate(req: any) {
    super.authenticate(req);
  }
}
