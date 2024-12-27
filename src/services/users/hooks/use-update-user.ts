import {UserApiService} from "../api.ts";
import {useToast} from "../../../hooks/use-toast.ts";
import {UpdateUserDTO} from "../dtos";
import {UserEntity} from "../entities/UserEntity.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useUpdateUser = (id: number) => {
   const api = new UserApiService();
   const queryClient = useQueryClient();
   const {toast} = useToast();
   
   return useMutation<UserEntity, Error, UpdateUserDTO>({
      mutationFn: async (dto: UpdateUserDTO) => {
         const user = await api.updateUser(id, dto);
         if (!user) {
            throw new Error("User creation failed");
         }
         return user;
      },
      onSuccess: async (data) => {
         console.log(data)
         toast({
            title: "User updated",
            description: "User has been updated successfully",
         });
         await queryClient.invalidateQueries({queryKey: ["users"]});
      },
      onError: (error) => {
         console.error(error)
         toast({
            title: "User update failed",
            description: error.message,
         });
      }
   })
}