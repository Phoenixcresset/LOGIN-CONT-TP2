import { FastifyInstance } from 'fastify'
import * as listsController from '../../controllers/lists.controller'
import { 
    listListsSchema, 
    addListSchema, 
    updateListSchema, 
    addItemSchema, 
    deleteItemSchema, 
    updateItemSchema,
    populateDatabaseSchema 
} from '../../schemas'

async function lists(fastify: FastifyInstance) {

  fastify.get('/', { schema: listListsSchema }, listsController.listLists)

  fastify.post('/', { schema: addListSchema }, listsController.addList)

  fastify.put('/:id', { schema: updateListSchema }, listsController.updateList)

  fastify.post('/:id/items', { schema: addItemSchema }, listsController.addItem)

  fastify.delete('/:listId/items/:itemId', { schema: deleteItemSchema }, listsController.deleteItem)

  fastify.put('/:listId/items/:itemId', { schema: updateItemSchema }, listsController.updateItem)

  fastify.get('/populate', { schema: populateDatabaseSchema}, listsController.populateDatabase)
}

export default lists