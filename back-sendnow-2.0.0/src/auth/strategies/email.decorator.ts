import { createParamDecorator, 
        ExecutionContext, 
        ForbiddenException
} from '@nestjs/common';
import { EmailPayload } from 'src/interfaces/email.payload';

export const Email = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): Partial<EmailPayload> => {
      try {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
      } catch (error) {
        throw new ForbiddenException();
      }
    }
  );