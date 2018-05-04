import { Injectable } from '@angular/core';
import { IHero } from './IHero'
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService<T> {
  private heroesUrl = 'api/heroes';  // URL to web api
  constructor(private http: Http) { }
  getHeroes(): Promise<T[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as T[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<T> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as T)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private headers = new Headers({ 'Content-Type': 'application/json' });
  update(hero: IHero): Promise<IHero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<IHero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data as IHero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}

