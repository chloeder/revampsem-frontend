import {UserApiService} from "../api.ts";
import {useToast} from "../../../hooks/use-toast.ts";
import {UpdateUserDTO} from "../dto";
import {UserEntity} from "../entity/UserEntity.ts";
import {useMutation} from "@tanstack/react-query";

export const useUpdateUser = (id: number) => {
   const api = new UserApiService();
   const {toast} = useToast();
   
   return useMutation<UserEntity, Error, UpdateUserDTO>({
      mutationFn: (dto: UpdateUserDTO) => api.updateUser(id, dto),
      onSuccess: (data) => {
         console.log(data)
         toast({
            position: "top-right",
            title: "User updated",
            description: "User has been updated successfully",
            status: "success"
         });
      },
      onError: (error) => {
         console.error(error)
         toast({
            position: "top-right",
            title: "User update failed",
            description: error.message,
            status: "error"
         });
      }
   })
}