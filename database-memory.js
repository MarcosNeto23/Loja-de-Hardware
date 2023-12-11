// importando randomUUID
import {randomUUID} from "node:crypto"
export class DatabaseMemory {
#headsets = new Map()
// listando headsets sem as chaves
list(search){
    return Array.from(this.#headsets.entries()).map((headsetArry) => {
// primeira posição
        const id = headsetArry[0]
// segunda posição
        const data = headsetArry[1]

        return{
            id,
            ...data,
        }
    })
// retornando apenas resultados da pesquisa
        .filter(headset => {
            if (search) {
                return headset.marca.includes(search)
            }
            return true
        })
}
//criando headset
create(headset){
    // gerando id aleatório com randomUUID
    const headsetId = randomUUID()
    this.#headsets.set(headsetId, headset)
}
// atualizando headset
update(id, headset){
    this.#headsets.set(id, headset)
}
// deletando headset
delete(id){
    this.#headsets.delete(id)
}
}