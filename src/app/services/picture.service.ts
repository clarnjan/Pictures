import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Picture } from '../Picture';

@Injectable({
    providedIn: 'root'
})
export class PictureService {

    private pictureUrl = "http://jsonplaceholder.typicode.com/photos";
    constructor(private http: HttpClient) {

    }
    getPictures(): Observable<Picture[]> {
        return this.http.get<Picture[]>(this.pictureUrl).pipe(
            tap(data => "All " + JSON.stringify(data)),
            catchError(this.handleError)
        );
    }

    getSpecificPicture(id: number): Observable<Picture> {
        return this.http.get<Picture>(this.pictureUrl + "/" + id).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError)
        );
    }

    deletePicture(id: number):Observable<any> {
        return this.http.delete(this.pictureUrl + "/" + id).pipe(
            catchError(this.handleError)
        );
    }

    updatePicture(picture:Picture):Observable<any>{
        return this.http.put<any>(`${this.pictureUrl}/${picture.id}`,picture,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(
            catchError(this.handleError)
        );
    }

    createPicture(picture:Picture):Observable<any>{
        return this.http.post<any>(`${this.pictureUrl}`,picture,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errMessage = "";
        if (err.error instanceof ErrorEvent) {
            errMessage = `An error occured ${err.error.message}`;
        } else {
            errMessage = `Server returned ${err.status}, error message is ${err.message}`;
        }
        console.error(errMessage);
        return throwError(errMessage);

    }
}