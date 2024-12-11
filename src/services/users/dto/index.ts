export type CreateUserDTO = {
   username: string;
   display_name: string;
   password: string;
   profit_center_id?: number;
}

export type UpdateUserDTO = {
   username?: string;
   display_name?: string;
   password?: string;
}