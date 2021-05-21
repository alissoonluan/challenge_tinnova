class Voto {
    constructor() {
        this.totalDeEleitores = 1000
        this.validos = 800
        this.votosBrancos = 150
        this.nulos = 50
    }

    calculaPercentual(valor){
        return `${valor / this.totalDeEleitores * 100}%`
    }

    getVotosValidos() {
        return 'Votos válidos = '+ this.calculaPercentual(this.validos)
    }

    getVotosBrancos() {
        return 'Votos Brancos = '+ this.calculaPercentual(this.votosBrancos) 
    }

    getVotosNulos() {
        return 'Votos Nulos = '+ this.calculaPercentual(this.nulos) 
    }
}

const instanciaVoto = new Voto()

console.log(instanciaVoto.getVotosValidos())
console.log(instanciaVoto.getVotosBrancos())
console.log(instanciaVoto.getVotosNulos())