import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Match } from 'src/match/entity/match';
import { match } from 'assert';
import { Team } from 'src/team/entity/team';
import { Over } from 'src/over/entity/Over';

export enum InningsStatus {
    NOT_STARTED = "NOT_STARTED",
    FINISHED = "FINISHED",
    RUNNING = "RUNNING",
    HAULTED = "HAULTED",
}

export enum InningsNumber {
  FIRST = "FIRST",
  SECOND = "SECOND",
}


@Entity()
export class Innings {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // matchid: number;

  @OneToOne(type => Match)
    @JoinColumn()
    match: Match;

  @Column({default: InningsNumber.FIRST})
  inningsNumber: InningsNumber;

  // @Column()
  // teambatting: number;

  @OneToOne(type => Team)
    @JoinColumn()
    teamBatting: Team;

  // @Column()
  // teambowling: number;

  @OneToOne(type => Team)
    @JoinColumn()
    teamBowling: Team;

  // //one innings has multiple overs
  // @OneToOne(type => Over)
  //   @JoinColumn()
  //   innings: Over;

  // @Column()
  // runscored: number;

  // @Column()
  // wicketslost: number;

  // //innings has multiple overs 
  // //do I need to connect it with the id or the index? 
  // @Column()
  // oversbowled: number;

  // @Column()
  // target: number;

  @Column({default: InningsStatus.NOT_STARTED})
  inningsStatus: InningsStatus;

}


