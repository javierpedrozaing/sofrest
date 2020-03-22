import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private apollo: Apollo) { }

  public globalQuery : any = gql`query {
    warehouses {
      id
      description
      code
      address
      phone
      state
      warehouse_type{
        id 
        description
        state
      }
    }
  }`;

  public globalQueryType: any = gql`query {
    warehouse_types {
      id
      description
      state
    }
  }`;

  public getWarehouses(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQuery
    }).valueChanges
  }

  public getWarehouse(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        warehouses(id:${id}) {
          id
          description
          code
          address
          phone
          state
          warehouse_type{
            id 
            description
            state
          }
        }
      }`
    }).valueChanges
  }

  public createWarehouse(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createWarehouse(
        $description: String!, 
        $code: String, 
        $address: String, 
        $phone: String, 
        $state: Int!, 
        $warehouse_type_id: Int!,
        $headquarter_id: Int!,
      ) {
        createWarehouse(description: $description, code: $code, address: $address, phone: $phone, state: $state, warehouse_type_id: $warehouse_type_id, headquarter_id: $headquarter_id, ) {
          id
          description
          code
          address
          phone
          state
          warehouse_type{
            id 
            description
            state
          }
        }
      }`,
      variables:{
        description : data.description,
        code: data. code,
        address: data.address,
        phone: data.phone,
        state : data.state,
        warehouse_type_id: data.warehouse_type_id,
        client_id : 1,
        headquarter_id : data.headquarter_id,
        user_creation : 1,
        user_update :1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public updateWarehouse(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateWarehouse(
        $id : Int!, ,$description: String!, $code: String, 
        $address: String, $phone: String, $state: Int!, $warehouse_type_id: Int!, $headquarter_id: Int!,
      ) {
        updateWarehouse(id:$id,description: $description, code: $code, address: $address, phone: $phone, state: $state, warehouse_type_id: $warehouse_type_id, headquarter_id: $headquarter_id,) {
          id
              description
              code
              address
              phone
              state
              warehouse_type{
                id 
                description
                state
              }
        }
      }`,
      variables:{
        id,
        description : data.description,
        code: data. code,
        address: data.address,
        phone: data.phone,
        state : data.state,
        warehouse_type_id: data.warehouse_type_id,
        client_id : 1,
        headquarter_id : data.headquarter_id,
        user_update :1
      },
      refetchQueries:[
        {
          query: this.globalQuery
        }
      ]
    });
  }

  public deleteWarehouse(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteWarehouse($id:Int!,) {
        deleteWarehouse(id:$id) {
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

  public getWarehousesTypes(): Observable<any>  {
    return this.apollo.watchQuery({
      query: this.globalQueryType
    }).valueChanges
  }

  public getWarehousesType(id): Observable<any>  {
    return this.apollo.watchQuery({
      query: gql`query {
        warehouse_types(id:${id}) {
          id
          description
          state
        }
      }`
    }).valueChanges
  }

  public createWarehouseType(data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation createWarehouseType(
        $description: String!, $state: Int!,
      ) {
        createWarehouseType(description: $description, state: $state,) {
          id
          description
          state
        }
      }`,
      variables:{
        description : data.description,
        state : data.state,
        client_id:1,
        user_creation:1,
        user_update:1
      },
      refetchQueries:[
        {
          query: this.globalQueryType
        }
      ]
    });
  }

  public updateWarehouseType(id,data): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateWarehouseType(
        $id : Int!, $description: String!, $state: Int!
      ) {
        updateWarehouseType(id:$id,description: $description, state: $state,  ) {
          id
          description
          state
        }
      }`,
      variables:{
        id,
        description : data.description,
        code: data. code,
        address: data.address,
        phone: data.phone,
        state : data.state,
        warehouse_type_id: data.warehouse_type_id,
        client_id : 1,
        headquarter_id : data.headquarter_id,
        user_update :1
      },
      refetchQueries:[
        {
          query: this.globalQueryType
        }
      ]
    });
  }

  public deleteWarehouseType(id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation deleteWarehouseType($id:Int!,) {
        deleteWarehouseType(id:$id) {
          id
        }
      }`,
      variables:{
        id,
      },
      refetchQueries:[
        {
          query: this.globalQueryType
        }
      ]
    });
  }

  public updateStateWarehouse(data,id): Observable<any>  {
    return this.apollo.mutate({
      mutation: gql`mutation updateStateWarehouse($id:Int!,$state: Int!,) {
        updateStateWarehouse(id:$id,state: $state,) {
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
