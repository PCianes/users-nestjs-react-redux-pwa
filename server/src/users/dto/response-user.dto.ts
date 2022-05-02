import { Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  surname: string;
}
