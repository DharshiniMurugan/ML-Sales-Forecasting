import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';






@Component({ 
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

  chardata:any;
  constructor(private route: ActivatedRoute){ }
  ngOnInit(): void {
    //this.http.get<any>('http://127.0.0.1:3000/prediction').subscribe((data) => {
      //this.chardata = data;
      //console.log('Received chart data:', this.chardata);
      // Now that the data has been received, you can render the chart here
    //});
    //const data = this.route.snapshot.paramMap.get('data');
    this.chardata = history.state.data;
    console.log('Received chart data:', this.chardata);
    this.RenderChart(this.chardata);
  }

  RenderChart(chardata:any){
      const ctx = document.getElementById('myChart');

  new Chart("myChart", {
    type: 'line',
    data: {
      labels: chardata.labels,
      datasets: [{
        label: 'Sales',
        data: chardata.sales,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  }


}
