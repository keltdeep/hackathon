import {
  Entity,
  Column,
  OneToOne
} from "typeorm";
import {BaseEntityWithDates} from "@/base-entity-with-dates";
import {User} from "./user.entity";

@Entity()
export class UserAdditionalFieldsEntity extends BaseEntityWithDates {
  /**
  * Фамилия
  */
  @Column()
    lastName: string;

  /**
  * Имя
  */
  @Column()
    firstName: string;

  /**
  * Отчество
  */
  @Column({nullable: true})
    secondName: string;

  /**
  * Кодовое слово
  */
  @Column()
    codeWord: string;

  /**
   * email
   */
  @Column({nullable: true})
    email: string;

  /**
   * Дата рождения
   */
  @Column({nullable: true})
    dateOfBirth: Date;

  /**
  * Пользователь которому пренадлежат поля
  */
  @OneToOne(() => User)
    user: User;
}