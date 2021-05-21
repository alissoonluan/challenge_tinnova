const vetorDesordenado = [5, 3, 2, 4, 7, 1, 0, 6]

let bubbleSort = (vetor) => {
    let length = vetor.length
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++){
            if (vetor[j] > vetor[j + 1]){
                let temp = vetor[j]
                vetor[j] = vetor[j + 1]
                vetor[j + 1] = temp
            }
        }
    }
    return vetor;
}

console.log(bubbleSort(vetorDesordenado))

