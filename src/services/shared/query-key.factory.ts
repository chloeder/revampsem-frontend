import {QueryKey} from "@tanstack/react-query";

export class QueryKeyFactory {
   private endpoint: string;
   
   constructor(endpoint: string) {
      this.endpoint = endpoint;
   }

   all(): QueryKey {
      return [this.endpoint, "all"];
   }
   
   // This for example is a query key for fetching all data
   paginations(): QueryKey {
      return [...this.all(), "paginations"];
   }
   
   // This for example is a query key for fetching all data with filters
   pagination(filters?: object): QueryKey {
      return [...this.paginations(), {filters}];
   }
   
   // Fetching details of a single data
   details(): QueryKey {
      return [...this.all(), "detail"];
   }
   
   // Fetching details of a single data with id
   detail(id: number, filters?: object): QueryKey {
      return [...this.details(), id, {filters}];
   }
   
   // Create a data
   create(): QueryKey {
      return [...this.all(), "create"];
   }
   
   // Update a data
   update(): QueryKey {
      return [...this.all(), "update"];
   }
   
   // Delete a data
   delete(): QueryKey {
      return [...this.all(), "delete"];
   }
}