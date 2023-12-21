import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Translation } from "./Translation";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.group)
  user: User;

  @OneToMany(() => Translation, (translation) => translation.group)
  translations: Translation[];
}
