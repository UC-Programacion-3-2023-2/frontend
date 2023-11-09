import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  
  list(): Observable<Movie[]> {
      return this.http.get<Movie[]>(`${environment.url_ms_cinema}/movies`);
  }
  show(id:number): Observable<Movie> {
    return this.http.get<Movie>(`${environment.url_ms_cinema}/movies/`+id);
  }

  create(newMovie: Movie){
    //Eliminar identificador (solo se hace en la creación), 
    //con el objetivo que el backend no entienda que el identificador por defecto
    //debe quedar guardado
    delete newMovie.id;
    return this.http.post(`${environment.url_ms_cinema}/movies`, newMovie);
  }
  update(newMovie: Movie){
    return this.http.put(`${environment.url_ms_cinema}/movies/${newMovie.id}`, newMovie);
  }
  delete(id: number){
    return this.http.delete(`${environment.url_ms_cinema}/movies/${id}`);
  }
}
