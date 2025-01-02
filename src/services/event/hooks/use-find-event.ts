import {QueryKeyFactory} from "../../shared/query-key.factory.ts";
import {EventApiService} from "../api.ts";
import {useQuery} from "@tanstack/react-query";

export const useFindEvent = () => {
   const api = new EventApiService();
   const queryKeyFactory = new QueryKeyFactory("events");
   
   return useQuery({
      queryKey: queryKeyFactory.all(),
      queryFn: () => api.getEvents()
   })
}