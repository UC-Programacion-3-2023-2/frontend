import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formGroupValidator : FormGroup;
  constructor(private moviesService: MovieService,
              private router: Router,
              private rutaActiva: ActivatedRoute,
              private formBuilder: FormBuilder) {

    this.theMovie = { id: 0, name: "", duration: 0, year: "2022-01-01" }
    this.creationMode=true;
  }

  ngOnInit(): void {
    this.formBuilding();
    if (this.rutaActiva.snapshot.params.id) {
      this.creationMode=false;
      this.show(this.rutaActiva.snapshot.params.id)
    }
  }
  formBuilding(){
    this.formGroupValidator=this.formBuilder.group({
      name : ['',[Validators.required]],
      duration : ['',[Validators.min(1),Validators.max(300),Validators.required]],
      year:['',[Validators.required]]
    });
  }
  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }
  movieData() : Movie{
    let theMovie= new Movie();
    theMovie.name=this.formGroupValidatorData.name.value;
    theMovie.duration=this.formGroupValidatorData.duration.value;
    theMovie.year=this.formGroupValidatorData.year.value;
    return theMovie;
  }
  show(id:number){
    this.moviesService.show(id).subscribe((jsonResponse: any) => {
      this.theMovie=jsonResponse
      this.theMovie.year=this.transformatDate(this.theMovie.year)
    });
    
    console.log(this.theMovie.year)
  }
  create() {
    if(this.formGroupValidator.invalid){
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer:3000 
      });
      return false;
    }
    this.theMovie=this.movieData();

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
  transformatDate(theDate: string): string {
    const theDateObject = new Date(theDate);
    return `${theDateObject.getFullYear()}-${theDateObject.getMonth() + 1}-${theDateObject.getDate()}`;
  }
}
