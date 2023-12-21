import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Group } from "./Group";

@Entity()
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  original_text: string;

  @Column("text")
  translated_text: string;

  @Column("text")
  language: string;

  @ManyToOne(() => Group, (group) => group.translations, {
    onDelete: "CASCADE",
  })
  group: Group;
}
