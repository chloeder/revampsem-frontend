import {AuthApiService} from "../api.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {UserEntity} from "../../users/entities/UserEntity.ts";
import {LoginDTO} from "../dtos";
import {useToast} from "../../../hooks/use-toast.ts";
import {AxiosError} from "axios";

export const useAuthLogin = (): UseMutationResult<UserEntity, Error, LoginDTO> => {
   const api = new AuthApiService();
   const queryClient = useQueryClient();
   const {toast}= useToast();
   
   return useMutation<UserEntity, Error, LoginDTO>({
      mutationFn: (dto: LoginDTO) => api.login(dto),
      onSuccess: () => {
         toast({
            title: "Login success",
            description: "You have successfully logged in",
         });
         queryClient.invalidateQueries({queryKey: ["isAuth"]});
      },
      onError: (error) => {
         if (error instanceof AxiosError){
            console.error(error)
            toast({
            title: "Login failed",
            description: error.response?.data.message,
         });
         } else {
            toast({
            title: "Login failed",
            description: error.message,
         });
         }
      }
   });
};