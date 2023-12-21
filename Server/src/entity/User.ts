import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Group } from "./Group";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column("text")
  email: string;

  @Column("text")
  password: string;

  @Column("date", { nullable: true })
  created_date: Date;

  @Column("date", { nullable: true })
  updated_date: Date;

  @OneToMany(() => Group, (group) => group.user)
  group: Group[];
}
