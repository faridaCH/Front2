import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { VilleComponent } from '../ville/ville.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveCityFormGuard implements CanDeactivate<VilleComponent> {
  canDeactivate(
    component: VilleComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.ville.nom != undefined) {
      return confirm("Êtes vous sur ?")
    }

    return true;
  }

}
