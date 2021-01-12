import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ball, Extras, SPECIAL } from '../entity/ball';
import { compareSync } from 'bcrypt';

import {Over, OverStatus} from '../../over/entity/Over';
import e from 'express';
import { InningsStatus, Innings } from 'src/innings/entity/innings';
import { MatchStatus, Match } from 'src/match/entity/match';
import { Player } from 'src/player/entity/Player';
import { Team } from 'src/team/entity/team';

@Injectable()
export class BallService {

    constructor(
        @InjectRepository(Ball)
        private ballRepository: Repository<Ball>,

        @InjectRepository(Over)
        private overRepository: Repository<Over>,

        @InjectRepository(Innings)
        private inningsRepository: Repository<Innings>,

        @InjectRepository(Match)
        private matchRepository: Repository<Match>,

        @InjectRepository(Player)
        private playerRepository: Repository<Player>,

        
    ) { }

    async create (ballindex: number,
        legalballindex:number, 
        striker: number,
        nonstriker: number,
        bowler: number,
        runs: number,
        wickets: number, 
        over: number,
        extras: Extras, 
        special: SPECIAL,
        explanation: string, 
        legal: boolean,
        matchid:number
        ){

        const lastballbowled = await this.getLastBallBowled(matchid);

        

        //updating the status of the game if it had not been changed already
        if (lastballbowled != undefined){
            if (lastballbowled.over.innings.inningsStatus === InningsStatus.NOT_STARTED){
                const reponse = await this.inningsRepository.update(lastballbowled.over.innings.id, 
                    {inningsStatus: InningsStatus.RUNNING});
                
            }
    
            if(lastballbowled.over.innings.match.matchstatus === MatchStatus.NOT_STARTED){
                const reponse = await this.matchRepository.update(lastballbowled.over.innings.match.id, 
                    {matchstatus: MatchStatus.RUNNING});
               

        }
       
    }
        let lastovercreated = await this.getLastOverCreated(matchid);
       

        //this works and updates the runs accoringly well
        if (runs >0)
        {
            const oversupdated = await this.updateOversRuns(lastovercreated, runs);
            lastovercreated = await this.getLastOverCreated(matchid);

        }

        let strikerruns = await this.getStriker(striker);
       
        let bowlerruns = await this.getBowler(bowler);

        let strikerupdate = null;
        let bowlerupdate = null;
        let legalballindexi = 1;

        //update the bowlers and the batsmens status

        if(legal){
            console.log('legal ball');
            if(extras === "NONE"){
                console.log("legal and no extras")
                console.log(wickets);
                console.log(explanation);
                strikerupdate = await this.runssofbat(striker, strikerruns, runs, wickets, explanation);
                bowlerupdate = await this.runsofbowler(bowler, bowlerruns, runs, extras, wickets, explanation);
            }
            //this would mean it is either leg byes or byes 
            else{
                console.log("legal and bye/legbyes")
                strikerupdate = await this.runssofbat(striker, strikerruns, 0, wickets, explanation);
                bowlerupdate = await this.runsofbowler(bowler, bowlerruns, 0,extras, wickets, explanation);
            }
        }
        else{
            console.log('illllllegal ball'); 
            legalballindexi = 0;
            bowlerupdate = await this.runsofbowler(bowler, bowlerruns, runs,extras, wickets, explanation);
            if (extras === "NOBALL"){
                console.log("illegal + noball")
                strikerupdate = await this.runssofbat(striker, strikerruns, runs -1, wickets, explanation);
            }
            //batsmen get a balls faced with no runs added to their tally
            else if (extras.indexOf("NO")!= -1){
                console.log("illegal + noballbyes/legbyes")
                strikerupdate = await this.runssofbat(striker, strikerruns, 0, wickets, explanation);
            }

            else{
                console.log('illllllegal WIDEBALL'); 
                bowlerupdate = await this.runsofbowler(bowler, bowlerruns, runs,extras, wickets, explanation);
            }
            
        }

        strikerruns = await this.getStriker(striker);
        console.log(strikerruns);
        bowlerruns = await this.getBowler(bowler);

        let ballindexi = 1;

        let ballcreated = null;

        if (lastballbowled === undefined || lastballbowled.over.id != lastovercreated.id){

            ballcreated = await this.createBall(ballindexi, legalballindexi, striker, nonstriker, bowler, 
                runs, wickets, lastovercreated, extras, special, explanation, legal
                );

            ballcreated = await this.ballRepository.save(ballcreated);
            
        }

        else {

            ballindexi = lastballbowled.ballindex +ballindexi;
            legalballindexi = lastballbowled.legalballindex +legalballindexi;

            ballcreated = await this.createBall(ballindexi, legalballindexi, striker, nonstriker, bowler, 
                runs, wickets, lastovercreated, extras, special, explanation, legal
                );

            ballcreated = await this.ballRepository.save(ballcreated);

        }

        if (wickets ===1){
            ballcreated['newbatsmen'] = await this.getBattingTeam(matchid, striker, nonstriker);
        }

        let strikeswitched = false;
        let switchedstrike = null;
        const nonstrikerruns = await this.getNonStriker(nonstriker);

        if(runs%2 ===1 && legal && legalballindexi<6){
          
            switchedstrike = await this.switchofstrike(ballcreated, strikerruns, nonstrikerruns);
            switchedstrike.over = lastovercreated;
            switchedstrike.bowler = await this.getBowler(bowler);

            strikeswitched = true;
            

        }
        else if ((runs-1)%2 ===1 && !legal && legalballindexi<6){
            switchedstrike = await this.switchofstrike(ballcreated, strikerruns, nonstrikerruns);
            switchedstrike.over = lastovercreated;
            switchedstrike.bowler = await this.getBowler(bowler);

            strikeswitched = true;
        }
        else {

            if (legalballindexi < 6){
            ballcreated.over = lastovercreated;
            ballcreated.striker = strikerruns;
            ballcreated.nonstriker = nonstrikerruns;
            ballcreated.bowler = await this.getBowler(bowler);
            }

            else {
                if (runs %2 ==0){
                    switchedstrike = await this.switchofstrike(ballcreated, strikerruns, nonstrikerruns);
                    switchedstrike.over = lastovercreated;
                    switchedstrike.bowler = await this.getBowler(bowler);
                 
                    strikeswitched = true;
                }
            }
            
        }


        const overindex = lastovercreated.overindex +1;
        const newoverruns = lastovercreated.runs;
        const newoverwickets = lastovercreated.wickets;

        // need to update this - 50 is depending on the number of overs match played
       
        if(legalballindexi === 6 && overindex <= 50){
            //the over is up, update the bowler's number of overs and if they can bowl or not
            console.log('overfinished');

            //update bowler 
            const bowlerfinishedover = await this.finishedoverbowler(bowler, bowlerruns, lastovercreated);
            const overfinished = await this.overRepository.update(lastovercreated.id, {status: OverStatus.FINISHED});

            let createdOver = this.createOver(lastballbowled, overindex, newoverruns, newoverwickets);
            createdOver = await this.overRepository.save(createdOver);
            console.log('creation of new over');
            console.log(createdOver);

        
            let newbowlers = await this.getBowlingTeam(matchid,bowler);

            createdOver['oldvalues'] = ballcreated;

            createdOver['newbowlers'] = newbowlers;

            return createdOver;



        }

        if (strikeswitched){

            return switchedstrike;
        
        }

        return ballcreated;

        

    }

    getBowlingTeam(matchid, bowlerid){
        //I am trying to get the team 
        return this.inningsRepository.createQueryBuilder('i')
                .leftJoinAndSelect('i.match', 'm')
                .leftJoinAndSelect('i.teamBowling', 't')
                .leftJoinAndSelect('t.players', 'p')
                .where('p.id != :bowlerid',{ bowlerid})
                .orWhere('p.bowlerstatus != :status', {status: "CANTBOWL"})

                .getMany()

    }

    getBattingTeam(matchid, batsmenoneid, batsmentwoid){
        //I am trying to get the team 
        return this.inningsRepository.createQueryBuilder('i')
                .leftJoinAndSelect('i.match', 'm')
                .leftJoinAndSelect('i.teamBatting', 't')
                .leftJoinAndSelect('t.players', 'p')
                .where('p.id != :batsmenoneid',{ batsmenoneid})
                .andWhere('p.id != :batsmentwoid',{ batsmentwoid})
                .orWhere('p.batterstatus != :status', {status: "OUT"})
                .getMany()

    }


    getAllBalls()
    {
        return this.ballRepository.createQueryBuilder('b')
                .leftJoinAndSelect('b.over', 'o')
                .leftJoinAndSelect('b.striker', 'p1')
                .leftJoinAndSelect('b.nonstriker', 'p2')
                .leftJoinAndSelect('b.bowler', 'p3')
                .getMany();
    }


    getLastBallBowled(matchid){

        const lastballbowled =  this.ballRepository.createQueryBuilder('b')
        .leftJoinAndSelect('b.over', 'o')
        .leftJoinAndSelect('o.innings', 'i')
        .leftJoinAndSelect('i.match', 'm')
        .where("m.id = :id", { id: matchid })
        .orderBy('b.id', 'DESC')
        .getOne();

        return lastballbowled;

    }

    getLastOverCreated(matchid){
        const lastovercreated = this.overRepository.createQueryBuilder('o')
                    .leftJoinAndSelect('o.innings', 'i')
                    .leftJoinAndSelect('i.match', 'm')
                    .where("m.id = :id", { id: matchid })
                    .orderBy('o.id', 'DESC')
                    .getOne();
        return lastovercreated;
    }

    updateOversRuns(lastovercreated, runs) {
        
            //first update the status of the over
            const update = this.overRepository.update(lastovercreated.id, {runs: lastovercreated.runs +runs,
                status: OverStatus.NOTFINISHED});
        return update;

    }


    getStriker(striker) {
        const strikerruns =  this.playerRepository.createQueryBuilder('p')
                    .where("p.id = :id", { id: striker })
                    .getOne();

        return strikerruns;

    }

    getNonStriker(nonstriker) {
        const nonstrikerruns =  this.playerRepository.createQueryBuilder('p')
                    .where("p.id = :id", { id: nonstriker })
                    .getOne();

        return nonstrikerruns;

    }


    runssofbat(striker, strikerruns, runs, wickets, explanation) {
       

        let data = {
            runs: strikerruns.runs+runs, 
            ballsfaced: strikerruns.ballsfaced +1
        }

        if (wickets ==1){
            if(explanation === "LBW" ||explanation === "BOWLED"){
                data['howout'] = explanation
                data['batterstatus'] = "OUT"
            }
        }

       const update = this.playerRepository.update(striker, data)
        
        return update;
    }

    getBowler(bowler){
        const bowlerruns = this.playerRepository.createQueryBuilder('p')
                    .where("p.id = :id", { id: bowler })
                    .getOne();
        return bowlerruns;
    }


    runsofbowler(bowler, bowlerruns, runs, extras, wickets, explanation) {

        let number = 0.1;
        if(extras === "WIDE" || extras.indexOf("NO") != -1){
            number = 0;
            if(extras.indexOf("BYES") != -1){
                runs =1;
            }
        }

        let data = {
            runsconceded: bowlerruns.runsconceded+runs, 
            oversbowled: bowlerruns.oversbowled +number
        }

        if (wickets === 1 && (explanation === "LBW" ||explanation === "BOWLED")){
            data['wickets'] = bowlerruns.wickets +1
        }
    
        const update = this.playerRepository.update(bowler, data);
        
        return update;
    }


    finishedoverbowler(bowler, bowlerruns, lastovercreated) {
        const newovers = parseInt(bowlerruns.oversbowled) +1;

        let data = {

            oversbowled: newovers
        }

        if(newovers === lastovercreated.innings.match.overs/5){
            data['bowlerstatus'] = "CANTBOWL"

        }

        let update = this.playerRepository.update(bowler, data);  
        return update;
    }


    createBall(ballindex, legalballindex, striker, nonstriker, bowler, 
        runs, wickets, OverValue, extras, special, explanation, legal
        ){
        const createdBall = this.ballRepository.create({
            ballindex, 
            legalballindex,
            striker: {
                id: striker
            },
            nonstriker: {
                id: nonstriker
            },
            bowler: {
                id: bowler
            },
            runs,
            wickets, 
            over: {
                id: OverValue.id
            }, 
            extras, special, explanation, legal
            
        });

        return createdBall;
    }

    createOver(lastballbowled, overindex, newoverruns, newoverwickets){


        const createdOver= this.overRepository.create({
            innings :{
                id: lastballbowled.over.innings.id
            },
            overindex: overindex,
            runs: newoverruns,
            wickets: newoverwickets,
        });


        return createdOver;
    }

    switchofstrike(createBall, firstbatsmen, secondbatsmen) {
        createBall.striker = secondbatsmen;
        createBall.nonstriker = firstbatsmen;
        return createBall;
    }


}



//I need to divide the code into the following statuses.


