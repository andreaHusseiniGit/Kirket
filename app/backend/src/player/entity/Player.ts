import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Team } from 'src/team/entity/team';
import { CONNREFUSED } from 'dns';

export enum PlayerRole {
    BATSMAN = "BATSMAN",
    AllROUNDER = "AllROUNDER",
    BOWLER = "BOWLER",

}

export enum BOWLERSTATUS {
  DNB = "DNB",
  CANBOWL = "CANBOWL",
  CANTBOWL = "CANTBOWL",

}

export enum HOWOUT {
  DNB = "DNB",
  BOWLED = "BOWLED",
  CAUGHT = "CAUGHT",
  LBW = "LBW",
  MANKAD = "MANKAD",
  RUNOUT = "RUNOUT",
  OTHER = "OTHER"

}

export enum BATTERSTATUS {
  DNB = "DNB",
  INJURED = "INJURED",
  NOUTOUT = "NOUTOUT",
  OUT = "OUT"

}


@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default: 0})
  runs: number;

  @Column({default: 0})
  ballsfaced: number;

  @Column({type:'float', default: 0})
  oversbowled: number;

  @Column({default: 0})
  wickets: number;

  @Column({default: 0})
  maidens: number;

  @Column({default: 0})
  runsconceded: number;

  @Column()
  role: PlayerRole;

  @Column({default: 0})
  catches:number;

  @Column({default : BATTERSTATUS.DNB})
  batterstatus: BATTERSTATUS

  @Column({default : BOWLERSTATUS.DNB})
  bowlerstatus: BOWLERSTATUS

  @Column({default : HOWOUT.DNB})
  howout: HOWOUT

  @ManyToOne(() => Team, team => team.players)
  team: Team;
}


