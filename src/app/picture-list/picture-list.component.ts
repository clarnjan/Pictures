import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators' 
import { Picture } from '../Picture';
import { PictureService } from '../services/picture.service';


@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css']
})
export class PictureListComponent implements OnInit {

  pictureList : Picture[];
  displayList : Picture[];
  page : number=1;
  picturesPerPage : number=23;
  errMessage : string;
  constructor(private pictureService: PictureService ) {
   }

  ngOnInit(): void {
    this.pictureService.getPictures().subscribe({
      next: pictures => {
        this.pictureList=pictures;
        this.displayList=this.getSlice();
      },
      error: err => this.errMessage=err
    });
  }

  getSlice(){
    return this.pictureList.slice((this.page-1)*this.picturesPerPage,this.page*this.picturesPerPage);
  }

  nextPage(){
    this.page+=1;
      this.displayList=this.getSlice();
  }
  previousPage(){
    if(this.page>1){
    this.page-=1;
    this.displayList=this.getSlice();
    }
  }

}
