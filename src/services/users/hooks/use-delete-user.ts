import {UserApiService} from "../api.ts";
import {useToast} from "../../../hooks/use-toast.ts";
import {AxiosError} from "axios";
import {useMutation} from "@tanstack/react-query";

export const useDeleteUser = () => {
   const api = new UserApiService();
   const {toast} = useToast();
   
   return useMutation({
      mutationFn: (id: number) => api.deleteUser(id),
      onSuccess: () => {
         toast({
            position: "top-right",
            title: "User deleted",
            description: "User has been deleted successfully",
            status: "success"
         });
      },
      onError: (error) => {
         if (error instanceof AxiosError) {
            console.error(error)
            toast({
               position: "top-right",
               title: "User deletion failed",
               description: error.response?.data.message,
               status: "error"
            });
         }
      }
   })
   
}