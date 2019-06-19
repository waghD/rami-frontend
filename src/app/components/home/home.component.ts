import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private graphql: GraphqlService) { }

  ngOnInit() {
    this.graphql.getAll().then(res => console.log('getAll: ', res)).catch(error => console.error(error));
    this.graphql.getCube(0).then(res => console.log('getCube: ', res)).catch(error => console.error(error));
    this.graphql.getOverview().then(res => console.log('getOverview: ', res)).catch(error => console.error(error));
    this.graphql.getRelatedOverItem(0).then(res => console.log('getRelatedOverItem: ', res)).catch(error => console.error(error));
    this.graphql.getRoute(1, 3).then(res => console.log('getRoute: ', res)).catch(error => console.error(error));
  }

  //toDo insert UI code here

}
