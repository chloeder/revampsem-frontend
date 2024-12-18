import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog.tsx";
import React from "react";

type ModalFormProps = {
   open: boolean;
   setOpen: (open: boolean) => void;
   children: React.ReactNode;
   triggerText?: React.ReactNode;
   title: string;
}

export function ModalForm({title, triggerText, open, setOpen, children}: ModalFormProps) {
   return (
     <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
           {triggerText}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
           <DialogHeader>
             <DialogTitle>{title}</DialogTitle>
           </DialogHeader>
           <hr/>
           {children}
        </DialogContent>
    </Dialog>
   )
}