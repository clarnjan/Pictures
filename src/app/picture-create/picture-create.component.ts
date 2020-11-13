import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Picture } from '../Picture';
import { PictureService } from '../services/picture.service';

@Component({
  selector: 'app-picture-create',
  templateUrl: './picture-create.component.html',
  styleUrls: ['./picture-create.component.css']
})
export class PictureCreateComponent implements OnInit {
  id: number;
  albumId:number;
  title: string;
  url:string;
  thumbnailUrl:string;
  picture: Picture;
  errMessage: string;
  constructor(private pictureService: PictureService, private route: ActivatedRoute,private router : Router) {
   }

  ngOnInit(): void {
  }
  finish():void{
    this.picture=new Picture(this.id,this.albumId,this.title,this.url,this.thumbnailUrl)
    console.log(this.picture);
    this.pictureService.createPicture(this.picture).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => this.errMessage = err
    });
    this.back();
  }
  back(){
    this.router.navigate(['/pictures']);
  }

}
