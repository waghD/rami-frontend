import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Cube } from '../models/Cube';

interface queryRes {
  cubes?: Cube[];
  pathTo?: Cube[];
  connectedOverItem?: Cube[];
}

/**
 * Service Class with some wrapper Functions to get Data from the GraphQL Backend server. Make sure the Backend server is running on localhost:4000
 */
@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) {}

  /**
   * Gets Overview of all Cubes with uid, label, color, coordinates. But without relations to Items or other Cubes
   */
  getOverview(): Promise<Cube[]> {
    return this.apollo.query<queryRes>({
      query: gql`
      {
        cubes {
          uid
          label
          color
          x
          y
          z
        }
      }
      `,
    }).toPromise().then(result => result.data.cubes);
  }

  /**
   * Gets the complete Dataset of all Cubes with all Attributes. Relationships have redundant data and go 1 level deep.
   */
  getAll(): Promise<Cube[]> {
    return this.apollo.query<queryRes>({
      query: gql`
      {
        cubes {
          uid
          label
          color
          x
          y
          z
          items {
            itemUid
            label
            type
            content
            refs {
              itemUid
            }
          }
          neighbours {
            uid
            label
            color
            x
            y
            z
          }
        }
      }
      `,
    }).toPromise().then(result => result.data.cubes);
  }

  /**
   * Gets full Data for a specific Cube. Includes all Attributes and Relations 1 level deep.
   * @param id uid of Cube
   */
  getCube(id: number): Promise<Cube[]> {
    return this.apollo.query<queryRes>({
      query: gql`
      {
        cubes(id: ${id}) {
          uid
          label
          color
          x
          y
          z
          items {
            itemUid
            type
            label
            content
            refs {
              itemUid
            }
          }
          neighbours {
            uid
            label
            color
            x
            y
            z
          }
        }
      }
      `,
    }).toPromise().then(result => result.data.cubes);
  }

  /**
   * Gets the shortest route Between two Cubes and returns all Cubes on this route with basic information.
   * @param startId uid of starting Cube
   * @param targetId uid of target Cube
   */
  getRoute(startId: number, targetId: number): Promise<Cube[]> {
    return this.apollo.query<queryRes>({
      query: gql`
      {
        pathTo(startId: ${startId}, targetId: ${targetId}) {
          uid
          label
          x
          y
          z
          neighbours {
            uid
          }
        }
      }
      `,
    }).toPromise().then(result => result.data.pathTo);
  }

  /**
   * Searches all Items that are connected to the specified Item and returns the Cubes they belong to.
   * @param itemId itemUid of Item
   */
  getRelatedOverItem(itemId: number): Promise<Cube[]> {
    return this.apollo.query<queryRes>({
      query: gql`
      {
        connectedOverItem(itemId: ${itemId}) {
          uid
          label
          items {
            itemUid
            refs {
              itemUid
            }
          }
        }
      }
      `,
    }).toPromise().then(result => result.data.connectedOverItem);
  }
}
