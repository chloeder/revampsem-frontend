export interface UserEntity {
   id: number;
   username: string;
   display_name: string;
   password: string;
   profit_center_id: number;
   level: number;
   reset_password: boolean;
   token: string;
   created_at: string;
   updated_at: string;
}