import {UserApiService} from "../api.ts";
import {useToast} from "../../../hooks/use-toast.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {UserEntity} from "../entity/UserEntity.ts";
import {CreateUserDTO} from "../dto";
import {AxiosError} from "axios";

export const useCreateUser = () => {
   const api = new UserApiService();
   const queryClient = useQueryClient();
   const {toast}= useToast();
   
   return useMutation<UserEntity, Error, CreateUserDTO>({
      mutationFn: async (dto: CreateUserDTO) => {
         const user = await api.createUser(dto);
         if (!user) {
            throw new Error("User creation failed");
         }
         return user;
      },
      onSuccess: async (data) => {
         console.log(data)
         toast({
            position: "top-right",
            title: "User created",
            description: "User has been created successfully",
            status: "success"
         });
         await queryClient.invalidateQueries({queryKey: ["users"]});
      },
      onError: (error) => {
         if (error instanceof AxiosError) {
            console.error(error)
            toast({
               position: "top-right",
               title: "User creation failed",
               description: error.response?.data.message,
               status: "error"
            });
         } else {
            toast({
               position: "top-right",
               title: "User creation failed",
               description: error.message,
               status: "error"
            });
         }
      }
   })
}