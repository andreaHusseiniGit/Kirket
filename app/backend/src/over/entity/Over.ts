import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Innings } from 'src/innings/entity/innings';
import { Match } from 'src/match/entity/match';


export enum OverStatus {
  NOTFINISHED = "NOTFINISHED",
  FINISHED = "FINISHED",
  INNINGSENDED = "INNINGSENDED",
  ABADONED = "ABADONED",
  CREATED = "CREATED"
}

@Entity()
export class Over {
  @PrimaryGeneratedColumn()
  id: number;
  
  //one over has one innings? 

  //There are many overs in an innings? 
  @ManyToOne(type => Innings, innings => innings.id)
    @JoinColumn()
    innings: Innings;
  // @Column()
  // inningsid: number;

  @Column()
  overindex: number;

  //these values can be updated 
  @Column({default: 0})
  runs: number;

  @Column({default: 0})
  wickets: number;


  @Column({default:OverStatus.CREATED})
  status: OverStatus;

  //Might need to include a status - whether finished or not 

}


