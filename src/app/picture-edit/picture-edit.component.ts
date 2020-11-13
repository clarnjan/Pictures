import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Picture } from '../Picture';
import { PictureService } from '../services/picture.service';

@Component({
  selector: 'app-picture-edit',
  templateUrl: './picture-edit.component.html',
  styleUrls: ['./picture-edit.component.css']
})
export class PictureEditComponent implements OnInit {

  picture: Picture;
  errMessage: string;

  constructor(private pictureService: PictureService, private route: ActivatedRoute,private router : Router) {
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pictureService.getSpecificPicture(id).subscribe({
      next: picture => {
        this.picture=picture;
      },
      error: err => this.errMessage=err
    })
  }
  finish():void{
    this.pictureService.updatePicture(this.picture).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => this.errMessage = err
    });
    this.back();
  }
  back(){
    this.router.navigate(['/pictures/',this.picture.id]);
  }

}
