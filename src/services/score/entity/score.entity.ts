import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne, JoinColumn,
} from "typeorm";
import {User} from "@services/users/entity/user.entity";

@Entity({name: "score"})
export class ScoreEntity {
    /**
     * Идентификатор
     */
    @PrimaryGeneratedColumn("uuid")
      uuid: string;

    /**
     * Валюта счета
     */
    @Column({default: "RUB"})
      currency: string;

    /**
     * Количество денег
     */
    @Column("float", {nullable: true})
      value: number;

    /**
     * Активный
     */
    @Column({default: true})
      isActive: boolean;

    @DeleteDateColumn()
      deletedAt: Date;

    @CreateDateColumn()
      createdAt: Date;

    @UpdateDateColumn()
      updatedAt: Date;

    @Column()
      userId: number

    /**
     * Пользователь которому пренадлежыт счет
     */
    @ManyToOne(() => User)
    @JoinColumn()
      user: User;
}