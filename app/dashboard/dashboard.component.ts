import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private http:HttpClient, private router: Router){ }
  name:string = ""
  file:any;
  choose:any;
  chardata:any;

  chooseopt(e:any){
  this.choose=e.target.value;
  console.log(this.choose)
  }

  getName(name:string){
  this.name = name;}
  onChange(event:any){
  this.file = event.target.files[0];
  console.log("file",this.file)

  }
  submitData(){
  let formData = new FormData();
  formData.set("name",this.name)
  formData.set("file",this.file)
  formData.set("choose",this.choose)

  this.http.post('http://127.0.0.1:3000/predict',formData).subscribe(
  (response)=>{
    this.http.get<any>('http://127.0.0.1:3000/predict').subscribe((data) => {
      this.chardata = data;
      console.log('Received chart data:', this.chardata);
      this.router.navigate(['/plot'], { state: { data: this.chardata } });
      // Now that the data has been received, you can render the chart here
    });
    //console.log(response); 
    //this.http.get('http://127.0.0.1:3000/predict', { responseType: 'text' }).subscribe(
        //(data: string) => {
          // create an image URL using the received data
          //let fig_data = 'data:image/jpg;base64,' + data;
          // do something with the image URL, such as display it on the page
          //console.log(fig_data);
        //},
        //error => {
          //console.log(error);
        //} 
    //);
  });
  //this.router.navigateByUrl('/plot');
  //this.http.get('http://127.0.0.1:3000/predict')
  

  }
}

