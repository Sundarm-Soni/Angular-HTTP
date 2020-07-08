import { HttpInterceptor, HttpEventType, HttpRequest, HttpHandler } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('Outgoing Request');
        console.log(req.url);
        return next.handle(req).pipe(tap(event => {
            if(event.type === HttpEventType.Response){
                console.log('Incoming Response');
                console.log(event.body);
            }
        }));


    }

}