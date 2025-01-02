import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToast} from "../../../hooks/use-toast.ts";
import {EventDetailDTO} from "../dtos";
import {AxiosError} from "axios";
import {EventApiService} from "../api.ts";

export const useCreateAttendance = () => {
   const api = new EventApiService();
   const queryClient = useQueryClient();
   const {toast} = useToast();
   
   return useMutation({
      mutationFn: async ({dto, file}: {dto: EventDetailDTO, file: File}) => {
         const event = await api.insertAttendance(Number(dto.event_id), file);
         if (!event) {
            throw new Error("Event creation failed");
         }
         return event;
      },
      onSuccess: async (data) => {
         console.log(data)
         toast({
            title: "Event created",
            description: "Event has been created successfully",
         });
         await queryClient.invalidateQueries({queryKey: ["attendance"]});
      },
      onError: (error) => {
         if (error instanceof AxiosError) {
            console.error(error)
            toast({
               title: "Event creation failed",
               description: error.response?.data.message,
            });
         } else {
            toast({
               title: "Event creation failed",
               description: error.message,
            });
         }
      }
   })

}