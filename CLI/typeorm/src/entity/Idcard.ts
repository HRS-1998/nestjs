import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({
  name: "id_card",
})
export class Idcard {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
    comment: "身份证号",
  })
  cardName: string
  @JoinColumn()
  @OneToOne(()=>User)
  user:User
}
