import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Player } from 'src/player/entity/Player';
import { Over } from 'src/over/entity/Over';

export enum Extras {
    WIDE = "WIDE",
    NOBALL = "NOBALL",
    NOBALLBYES = "NOBALLBYES",
    NOBALLLEGBYES = "NOBALLLEGBYES",
    BYES = "BYES",
    LEGBYES = "LEGBYES",
    NONE = "NONE"
}


export enum SPECIAL {
    STRIKERINJURED = "STRIKERINJURED",
    NONSTRIKERINJURED = "NONSTRIKERINJURED",
    BOWLERINJURED = "BOWLERINJURED",
    RAIN = "RAIN",
    NONE = "NONE"

}

@Entity()
export class Ball {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ballindex: number;

  @Column()
  legalballindex: number;

//these are all relationed with one another 

  @ManyToOne(type => Player, player => player.id)
    @JoinColumn()
    striker: Player;

  @ManyToOne(type => Player, player => player.id)
    @JoinColumn()
    nonstriker: Player;

  @ManyToOne(type => Player, player => player.id)
    @JoinColumn()
    bowler: Player;
  
  @ManyToOne(type => Over, over => over.id)
    @JoinColumn()
    over: Over;
//these are all relationed with one another

  @Column({ default: 0 })
  runs: number;

  @Column({ default: 0 })
  wickets: number;

  @Column({ default: true })
  legal: boolean;

  @Column({default:Extras.NONE})
  extras: Extras;

  @Column({default:SPECIAL.NONE})
  special: SPECIAL;


  @Column({default:" "})
  explanation: string;

}


