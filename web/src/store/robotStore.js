import { defineStore } from 'pinia'

export const useRobotStore = defineStore("robot", {
    state() {
        return {
            status: "STARTED",
            temps: 0,
            score: 0,
            capteurGlongueur: 50,
            capteurDlongueur: 50,
            capteurGangle: 0,
            capteurDangle: 0,
        }
    },
    actions: {
        updateStatus(status){
            this.status = status;
        },
        updateTemps(temps){
            this.temps = temps;
        },
        updateScore(score){
            this.score = score;
        },
        updateCapteurGlongueur(longueur){
            this.capteurGlongueur = longueur;
        },
        updateCapteurDlongueur(longueur){
            this.capteurDlongueur = longueur;
        },
        updateCapteurGangle(angle){
            this.capteurGangle = angle;
        },
        updateCapteurDangle(angle){
            this.capteurDangle = angle;
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {storage: localStorage, paths:['status', 'temps', 'score', 'capteurGlongueur', 'capteurDlongueur', 'capteurGangle', 'capteurDangle']}
        ]
    }
})