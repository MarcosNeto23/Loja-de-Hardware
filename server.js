// importando o fastify
import {fastify} from 'fastify'
// importando databese memory
import { DatabaseMemory } from './database-memory.js'
import { request } from 'http'
// criando nosso servidor
const server = fastify()
//Criando o database
const database = new DatabaseMemory()
// criando um haadset
server.post('/headsets', (request, reply) => {
// acessando dados do corpo (desestruturado)
    const {marca, cor, preco} = request.body

    database.create({
        marca: marca,
        cor: cor,
        preco: preco,
    })
// vomos listar ele
    console.log(database.list())
// retornando o status da rota
    return reply.status(201).send()
})
server.get('/headsets', (request) => {
// pegando a busca
    const search = request.query.search
// imprimindo a busca
    console.log(search)
//acessando database
    const headsets = database.list(search)
    //console.log(headsets)
// retornando headsets
    return headsets
})

server.put('/headsets/:id', (request, reply) => {
// return "Atualizar!"
// passando id do headset
    const headsetId = request.params.id
// passando o restante dos atributos
    const {marca, cor, preco} = request.body
    const headset = database.update(headsetId, {
        marca: marca,
        cor: cor,
        preco: preco,
    })
    // sucesso sem conteudo
    return reply.status(204).send()
})
// passando a porta com objecto

server.delete('/headsets/:id', (request, reply) => {
// passando Id do headset
    const headsetId = request.params.id
// deletando o headset
    database.delete(headsetId)
// retornando status de sucesso em banco
    return reply.status(204).send()
})
server.listen({
    port: 3333,
})