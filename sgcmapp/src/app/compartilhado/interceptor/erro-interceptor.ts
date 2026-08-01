import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(erro => {
      let mensagemErro = 'Falha na requisição.';
      alert(mensagemErro);
      return throwError(() => erro);
    })
  );
};
