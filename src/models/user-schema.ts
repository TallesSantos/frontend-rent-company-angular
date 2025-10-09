import { AddressSchema } from "./address-schema";
import { ClientSchema } from "./client-schema";
import { PermissionRolesSchema } from "./permission-roles-schema";
import { PhoneSchema } from "./phone-schema";

export interface UserSchema {
  id: number;
  name: string;
  email: string;
  userType: string;
  addresses?: AddressSchema[];
  phone?: PhoneSchema[];
  permissionRoles?: PermissionRolesSchema[];
  client?: ClientSchema

}
