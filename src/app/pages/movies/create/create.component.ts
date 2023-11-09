import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  theMovie: Movie;
  creationMode:boolean;
  constructor(private moviesService: MovieService,
              private router: Router,
              private rutaActiva: ActivatedRoute) {

    this.theMovie = { id: 0, name: "", duration: 0, year: "" }
    this.creationMode=true;
  }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id) {
      this.creationMode=false;
      this.show(this.rutaActiva.snapshot.params.id)
    }
  }
  show(id:number){
    this.moviesService.show(id).subscribe((jsonResponse: any) => {
      this.theMovie=jsonResponse
    });
  }
  create() {
    console.log("Creando a " + JSON.stringify(this.theMovie))
    
    this.moviesService.create(this.theMovie).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Creado',
        icon: 'success',
      })
      this.router.navigate(["movies/list"])
    });
  
  }
  update(){
    this.moviesService.update(this.theMovie).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Actualizando',
        icon: 'success',
      })
      this.router.navigate(["movies/list"])
    });
  }
}
