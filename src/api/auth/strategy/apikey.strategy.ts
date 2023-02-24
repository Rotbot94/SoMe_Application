import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(private authService: AuthService) {
    super(
      { header: 'Authorization', prefix: 'Bearer ' },
      true,
      async (apikey, done) => {
        console.log(apikey);
        if (this.authService.validateApiKey(apikey) == 0) {
          done(null, true);
        }
        done(new UnauthorizedException(), null);
      },
    );
  }
}
