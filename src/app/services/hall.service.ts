import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HallService {

  constructor(private apollo: Apollo) { }
  public globalQuery : any = gql`query {
    halls {
      id
      description
      state
      hall_type{
        id
        description
      }
    }
  }`;
  public getHalls(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getHall(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        halls(id:${id}) {
          id
          description
          state
          hall_type{
            id
            description
          }
        }
      }`
    }).valueChanges
  }

  public createHall(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createHall(
        $description: String!,
        $state: Int!,
        $hall_type_id: Int!,
      ) {
        createHall(
          description: $description,
          state: $state,
          hall_type_id : $hall_type_id,
        ) {
            id
            description
            state
            hall_type{
              id
              description
            }
        }
      }`,
      variables:{
        description : data.description,
        state : data.state ? 1 : 0,
        hall_type_id : 1,
        user_creation:1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateHall(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateHall(
        $id : Int!,
        $description: String!,
        $state: Int!,
        $hall_type_id: Int!,
      ) {
        updateHall(id:$id,
          description: $description,
          state: $state,
          hall_type_id : $hall_type_id,
          ) {
          id
          description
          state
          hall_type{
            id
            description
          }
        }
      }`,
      variables:{
        id,
        description : data.description,
        state : data.state ? 1 : 0,
        hall_type_id:1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteHall(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteHall($id:Int!,) {
        deleteHall(id:$id) {
          id
        }
      }`,
      variables:{
        id,
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateStateHall(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateHall($id:Int!,$state: Int!,) {
        updateStateHall(id:$id,state: $state) {
          id
        }
      }`,
      variables:{
        id,
        state: data.state ? 1 : 0,
        user_update: 1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

}
