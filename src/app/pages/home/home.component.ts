import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DataService } from 'src/app/services/data.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myChart:any = [];
  clubList:any[];
  eventList:any[];
  bookedList:any[];
  constructor(private data:DataService,private db:AngularFireDatabase,private router: Router) {
 
    this.rtnEvents();
    this.rtnClub();
    this.rtnBooked();
   }
   rtnClub(){
    this.data.getClubChanges().subscribe(data=>{
      this.clubList=data.map(e=>{
        return{
          key:e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          add: e.payload.doc.data()['address'],
          open: e.payload.doc.data()['openingHours'],
          close: e.payload.doc.data()['closingHours'],
          photo: e.payload.doc.data()['photoURL'],
        }as Club;
      });
      console.log(this.clubList)
    });

   }
   rtnEvents(){
     this.data.getEventsChanges().subscribe(event=>{
       this.eventList=event.map(e=>{
         return{
          key:e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          add: e.payload.doc.data()['address'],
          open: e.payload.doc.data()['openingHours'],
          close: e.payload.doc.data()['closingHours'],
          photo: e.payload.doc.data()['photoURL'],
         }as Events
       });
       console.log(this.eventList)
     });
   
   }
   rtnBooked(){
    this.data.getBokedChanges().subscribe(event=>{
      this.bookedList=event.map(e=>{
        return{
         key:e.payload.doc.id,
         name: e.payload.doc.data()['name'],
         add: e.payload.doc.data()['address'],
         open: e.payload.doc.data()['openingHours'],
         close: e.payload.doc.data()['closingHours'],
         photo: e.payload.doc.data()['photoURL'],
         approved: e.payload.doc.data()['approved'],
         price: e.payload.doc.data()['price'],
         tickets: e.payload.doc.data()['tickets'],
         total: e.payload.doc.data()['total'],
        //  approved:boolean=false;
        //  price:number;
        //  tickrts:number;
        //  total:number;
        }as Events
      });
      console.log(this.bookedList)
    });
   }
  ngOnInit() {
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
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
//  dssssssssssssssssssssssssssssssss
new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    datasets: [{ 
        data: [86,114,106,106,107,111,133,221,783,2478],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false
      }, { 
        data: [282,350,411,502,635,809,947,1402,3700,5267],
        label: "Asia",
        borderColor: "#8e5ea2",
        fill: false
      }, { 
        data: [168,170,178,190,203,276,408,547,675,734],
        label: "Europe",
        borderColor: "#3cba9f",
        fill: false
      }, { 
        data: [40,20,10,16,24,38,74,167,508,784],
        label: "Latin America",
        borderColor: "#e8c3b9",
        fill: false
      }, { 
        data: [6,3,2,2,7,26,82,172,312,433],
        label: "North America",
        borderColor: "#c45850",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'World population per region (in millions)'
    }
  }
});
}

// onDelete(comment){
  //   this.dataService.deleteComment(comment.key)
  //   alert("comment deleted");
  // }
  // onDelete
  onDelete(key) {
    this.data.delete(key);
    alert("Club deleted");
  }
  update(){
    this.data.update(this.clubList,this.clubList[0].key);
    console.log("updated")
    
   }
   onUpdate(item) {
    this.router.navigate(['/update'], { queryParams: { key: item.key, name: item.name, address: item.address, open: item.open, close: item.close } })
  }
}
 

