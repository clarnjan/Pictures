import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Picture } from '../Picture';
import { PictureService } from '../services/picture.service';

@Component({
  templateUrl: './picture-details.component.html',
  styleUrls: ['./picture-details.component.css']
})
export class PictureDetailsComponent implements OnInit {

  picture: Picture;
  errMessage: string;

  constructor(private pictureService: PictureService, private route: ActivatedRoute,private router : Router) {
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pictureService.getSpecificPicture(id).subscribe({
      next: picture => {
        this.picture = picture;
      },
      error: err => this.errMessage = err
    })
  }

  delete() {
    if (confirm("Are you sure you want to delete this picture?")) {
      this.pictureService.deletePicture(this.picture.id).subscribe({
        next: data => {
          console.log(data);
        },
        error: err => this.errMessage = err
      })
    }
  }

  back(){
    this.router.navigate(['/pictures']);
  }

}
