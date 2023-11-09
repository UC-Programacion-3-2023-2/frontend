import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  movies: Movie[];
  constructor(private moviesService: MovieService,
              private router:Router) {

  }

  ngOnInit(): void {
    this.moviesService.list().subscribe((jsonResponse: any) => {
      this.movies = jsonResponse.data; // Almacena la respuesta en la variable 'datos'
    });
  }
  create(){
    this.router.navigate(["movies/create"])
  }
  edit(id: number) {
    console.log("Editando a " + id)
    this.router.navigate(["movies/update/"+id])
  }
  delete(id: number) {
    console.log("Eliminando a " + id)
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar la película?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.moviesService.delete(id).subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'Eliminación culminada exitosamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }

}
