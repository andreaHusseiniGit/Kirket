import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Player } from 'src/player/entity/Player';



@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //type, the connection between the two tables
  @OneToMany(() => Player, player => player.team)
  players: Player[];

}


