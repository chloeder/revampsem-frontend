import {AuthApiService} from "../api.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {UserEntity} from "../../users/entity/UserEntity.ts";
import {LoginDTO} from "../dto";
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
            position: "top-right",
            title: "Login success",
            description: "You have successfully logged in",
            status: "success"
         });
         queryClient.invalidateQueries({queryKey: ["isAuth"]});
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