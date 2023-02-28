import { Expose } from 'class-transformer';

export class GetUserDTO {
  @Expose()
  public id;
  @Expose()
  public first_name;
  @Expose()
  public last_name;
  @Expose()
  public email;
  @Expose()
  public createdAt;
  @Expose()
  public updatedAt;
}
