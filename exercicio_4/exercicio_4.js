const multi3ou5 = (x) => {
    let soma = 0

    for(let i = 0; i < x; i++){
        if(i % 3 === 0 || i % 5 === 0) soma += i
    }

    return soma
}

console.log(multi3ou5(10))