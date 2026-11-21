import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class RespondInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data)=>({
        status:   res.statusCode,
        message:  data.message || 'successfull !',
        result:   data.result
      }))
    );
  }
}
