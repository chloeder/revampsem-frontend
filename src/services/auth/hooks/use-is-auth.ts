import {AuthApiService} from "../api.ts";
import {QueryKeyFactory} from "../../shared/query-key.factory.ts";
import {useQuery} from "@tanstack/react-query";

export const useIsAuth = ()=> {
   const api = new AuthApiService();
   const queryKeyFactory = new QueryKeyFactory("isAuth");
   
   return useQuery({
      queryKey: queryKeyFactory.all(),
      queryFn: () => api.isAuth(),
      retry: 1
   })
}