import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Person } from './person';

// const PEOPLE : Person[] = [
//       {id: 1, name: 'Luke Skywalker', height: 177, weight: 70},
//       {id: 2, name: 'Darth Vader', height: 200, weight: 100},
//       {id: 3, name: 'Han Solo', height: 185, weight: 85},
//     ];

@Injectable()
export class PeopleService{
  private baseUrl: string = 'http://localhost:4000/heroi';
  constructor(private http : Http){
  }

  getAll(): Observable<Person[]>{
    console.log(11111111111);

    let people$ = this.http
      // .get(`${this.baseUrl}/people`, { headers: this.getHeaders()})
      .get(this.baseUrl)
      .map(mapPersons)
      .catch(handleError);

      console.log(2222222222, people$);
      return people$;
  }

  // private getHeaders(){
  //   // I included these headers because otherwise FireFox
  //   // will request text/html
  //   let headers = new Headers();
  //   headers.append('Accept', 'application/json');
  //   return headers;
  // }
  get(id: number): Observable<Person> {
    let person$ = this.http
      // .get(`${this.baseUrl}/people/${id}`, {headers: this.getHeaders()})
      .get(this.baseUrl)
      .map(mapPerson)
      .catch(handleError);
      return person$;
  }

  // save(person: Person) : Observable<Response>{
  //   // this won't actually work because the StarWars API doesn't 
  //   // is read-only. But it would look like this:
  //   return this
  //     // .http
  //     // .put(`${this.baseUrl}/people/${person.id}`, 
  //     //       JSON.stringify(person), 
  //     //       {headers: this.getHeaders()});
  // }

}


function mapPersons(response:Response): Person[]{
  //throw new Error('ups! Force choke!');

  // The response of the API has a results
  // property with the actual results

  console.log(3333333);

  return response.json().map(toPerson)
}

function toPerson(r:any): Person{

  console.log(44444444444); 
  let person = <Person>({
    id: r.id,
    // url: r.url,
    name: r.name,
    // weight: Number.parseInt(r.mass),
    // height: Number.parseInt(r.height),
  });
  console.log('Parsed person:', person);
  return person;
}

// to avoid breaking the rest of our app
// I extract the id from the person url
function extractId(personData:any){
  let extractedId = personData.url.replace('http://localhost:4000/heroi','').replace('/','');
  return parseInt(extractedId);
}

function mapPerson(response:Response): Person{
   // toPerson looks just like in the previous example
   return toPerson(response.json());
}

// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}

