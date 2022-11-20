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
import {BaseEntityWithDates} from "@/base-entity-with-dates";
import {userRights} from "@/configs/enums/user-rights";
import {TransactionType} from "@/configs/enums/transaction-type";

@Entity({name: "transaction_history"})
export class TransactionHistoryEntity extends BaseEntityWithDates{
    @Column({nullable: true})
    fromCurrency: string;

    @Column({nullable: true})
    toCurrency: string;

    @Column({
        type: "enum",
        enum: TransactionType,
    })
    type: TransactionType;

    @Column("float")
    value: number

    @Column()
    scoreUuid: string;

    @Column({nullable: true})
    additionalScoreUuid: string
}