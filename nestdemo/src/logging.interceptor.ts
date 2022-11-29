import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

// 面向切面

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // console.log('Before');
        const now = Date.now();
        return next.handle()
            .pipe(
                tap(() => console.log(`elapse ${Date.now() - now}ms`)),
            );
    }
}