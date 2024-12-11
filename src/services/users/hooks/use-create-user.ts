import {UserApiService} from "../api.ts";
import {useToast} from "../../../hooks/use-toast.ts";
import {useMutation} from "@tanstack/react-query";
import {UserEntity} from "../entity/UserEntity.ts";
import {CreateUserDTO} from "../dto";
import {AxiosError} from "axios";

export const useCreateUser = () => {
   const api = new UserApiService();
   const {toast}= useToast();
   
   return useMutation<UserEntity, Error, CreateUserDTO>({
      mutationFn: (dto: CreateUserDTO) => api.createUser(dto),
      onSuccess: (data) => {
         console.log(data)
         toast({
            position: "top-right",
            title: "User created",
            description: "User has been created successfully",
            status: "success"
         });
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