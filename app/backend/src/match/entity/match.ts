import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Team } from 'src/team/entity/team';
import { User } from 'src/auth/entity/User';

export enum MatchStatus {
    NOT_STARTED = "NOT_STARTED",
    FINISHED = "FINISHED",
    RUNNING = "RUNNING",
    HAULTED = "HAULTED",

}

export enum Result {
    TEAMONE = "TEAMONE",
    TEAMTW0 = "TEAMTW0",
    DRAW = "DRAW",
    ABADONED = "ABADONED",
    UNCALCULATED = 'UNCALCULATED'

}


@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.matches)
  user: User;


  @Column()
  date: Date;

  @Column({default:MatchStatus.NOT_STARTED})
  matchstatus: MatchStatus;


  @Column()
  overs: number;

  @Column({default: false})
  reducedovers: boolean;

  //need to ask Hemang if this can be activated with another value
  @Column({default: null})
  reducedoversvalue: number;


  @OneToOne(type => Team)
  @JoinColumn()
  teamone: Team;

  @OneToOne(type => Team)
  @JoinColumn()
  teamtwo: Team;


  @Column({default:Result.UNCALCULATED})
  result: Result;




}


