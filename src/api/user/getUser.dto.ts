import { Expose } from 'class-transformer';

export class GetUserDTO {
  @Expose()
  @Expose()
  public id;
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
