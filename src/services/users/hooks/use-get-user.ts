import {UserApiService} from "../api.ts";
import {QueryKeyFactory} from "../../shared/query-key.factory.ts";
import {useQuery} from "@tanstack/react-query";

export const useGetUser = (id: number) => {
   const api = new UserApiService();
   const queryKeyFactory = new QueryKeyFactory("user");

   
   return useQuery({
      queryKey: queryKeyFactory.detail(id),
      queryFn: () => api.getUser(id)
   })
}