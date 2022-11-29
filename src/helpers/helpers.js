const { v4: uuidv4 } = require('uuid');


function products(){
    return {
        Aceite: 2,
        SalsaTomate: 4,
        Arroz: 2,
        Tallarines: 4,
        Avena: 1,
        Leche: 1,
        Mermelada: 2,
        Azucar: 2,
        BolsaTe: 30,
        Jurel: 2,
        Harina: 1,
        Lentejas: 1
    }
}

function missingProd(cant, prod) {
    return {
        Aceite: (prod.Aceite * cant),
        SalsaTomate: (prod.SalsaTomate * cant),
        Arroz: (prod.Arroz * cant),
        Tallarines: (prod.Tallarines * cant),
        Avena: (prod.Avena * cant),
        Leche: (prod.Leche * cant),
        Mermelada: (prod.Mermelada * cant),
        Azucar: (prod.Azucar * cant),
        BolsaTe: (prod.BolsaTe * cant),
        Jurel: (prod.Jurel * cant),
        Harina: (prod.Harina * cant),
        Lentejas: (prod.Lentejas * cant)
    }
}

module.exports = {
    products,
    missingProd
}