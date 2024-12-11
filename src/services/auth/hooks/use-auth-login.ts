import {AuthApiService} from "../api.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {UserEntity} from "../../users/entity/UserEntity.ts";
import {LoginDTO} from "../dto";
import {useToast} from "../../../hooks/use-toast.ts";
import {AxiosError} from "axios";

export const useAuthLogin = (): UseMutationResult<UserEntity, Error, LoginDTO> => {
   const api = new AuthApiService();
   const {toast}= useToast();
   
   return useMutation<UserEntity, Error, LoginDTO>({
      mutationFn: (dto: LoginDTO) => api.login(dto),
      onSuccess: (data) => {
         console.log(data)
         toast({
            position: "top-right",
            title: "Login success",
            description: "You have successfully logged in",
            status: "success"
         });
      },
      onError: (error) => {
         if (error instanceof AxiosError){
            console.error(error)
            toast({
            position: "top-right",
            title: "Login failed",
            description: error.response?.data.message,
            status: "error"
         });
         } else {
            toast({
            position: "top-right",
            title: "Login failed",
            description: error.message,
            status: "error"
         });
         }
      }
   });
};