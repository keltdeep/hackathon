import {
  Entity,
  Column, OneToOne, JoinColumn, OneToMany,
} from "typeorm";
import {BaseEntityWithDates} from "@/base-entity-with-dates";
import {userRoles} from "@/configs/enums/user-roles";
import {userRights} from "@/configs/enums/user-rights";
import {UserAdditionalFieldsEntity} from "@services/users/entity/user-additional-fields.entity";
import {ScoreEntity} from "@services/score/entity/score.entity";

@Entity()
export class User extends BaseEntityWithDates {
  /**
  * Логин
  */
  @Column()
    login: string;

  /**
  * Пароль
  */
  @Column({nullable: true})
    password: string;

  /**
  * Роль
  */
  @Column({
    type: "enum",
    enum: userRoles,
    default: userRoles.user
  })
    role: userRoles;

  /**
  * Права пользователя
  */
  @Column({
    array: true,
    nullable: true,
    type: "enum",
    enum: userRights,
    default: null
  })
    rights: userRights[];

  /**
   * Пользователь подтвержден
   */
  @Column({default: 0})
    verify: number;

  /**
   * Дополнительные поля пользователя
   */
  @OneToOne(() => UserAdditionalFieldsEntity, {nullable: true})
  @JoinColumn()
    additionalFields: UserAdditionalFieldsEntity;

  /**
   * Счета пользователя
   */
  @OneToMany(() => ScoreEntity, (score) => score.user)
  @JoinColumn()
    userScore: ScoreEntity[];
}