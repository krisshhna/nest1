import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class HttpexceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    let config = host.switchToHttp();
    let req = config.getRequest();
    let res = config.getResponse();
    let msg = `Internal issue message ${exception}`;

    return res.status(res.statusCode).json({
      status:res.statusCode,
      message:msg,
      url:req.url,
      time:Date.now()
    });
  }
}
