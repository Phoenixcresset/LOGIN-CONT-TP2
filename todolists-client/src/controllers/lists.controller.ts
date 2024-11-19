import { FastifyReply, FastifyRequest } from "fastify"
import { ITodoList, ITodoItem } from '../interfaces'

const staticLists: ITodoList[] = [
  {
	id: '1',
	description: 'Bootstrap the course project',
  items: [
    {
      id: '1',
      description: 'Create the project structure',
      status: 'DONE'
    },
    {
      id: '2',
      description: 'Create the project structure',
      status: 'DONE'
    },
    {
      id: '3',
      description: 'Create the project structure',
      status: 'DONE'
    }
  ]
  },
]

export async function listLists(request: FastifyRequest, reply: FastifyReply) {
  console.log('DB status', this.level.leveldb.status)
  const listsIter = this.level.leveldb.iterator()

  const result: ITodoList[] = []
  for await (const [key, value] of listsIter) {
    result.push(JSON.parse(value))
  }
  reply.send(result)
}

export async function addList(request: FastifyRequest, reply: FastifyReply) {
  const list = request.body as ITodoList
  console.log('list to save: ', list)
  const result = await this.level.leveldb.put(list.id.toString(), JSON.stringify(list))
  reply.send(result)
}

export async function updateList(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const list = request.body as ITodoList
  console.log('list to update: ', list)
  const result = await this.level.leveldb.put(id, JSON.stringify(list))
  reply.send(result)
}

export async function addItem(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const item = request.body as ITodoItem
  console.log('item to add: ', item)
  const list = JSON.parse(await this.level.leveldb.get(id)) as ITodoList
  list.items.push(item)
  const result = await this.level.leveldb.put(id, JSON.stringify(list))
  reply.send(result)
}

export async function deleteItem(request: FastifyRequest, reply: FastifyReply) {
  const { listId, itemId } = request.params as { listId: string, itemId: string }
  const list = JSON.parse(await this.level.leveldb.get(listId)) as ITodoList
  list.items = list.items.filter(item => item.id !== itemId)
  const result = await this.level.leveldb.put(listId, JSON.stringify(list))
  reply.send(result)
}

export async function updateItem(request: FastifyRequest, reply: FastifyReply) {
  const { listId, itemId } = request.params as { listId: string, itemId: string }
  const updatedItem = request.body as ITodoItem
  const list = JSON.parse(await this.level.leveldb.get(listId)) as ITodoList
  const itemIndex = list.items.findIndex(item => item.id === itemId)
  if (itemIndex !== -1) {
    list.items[itemIndex] = updatedItem
    const result = await this.level.leveldb.put(listId, JSON.stringify(list))
    reply.send(result)
  } else {
    reply.status(404).send({ message: 'Item not found' })
  }
}

export async function populateDatabase(request: FastifyRequest, reply: FastifyReply) {
  for (const list of staticLists) {
    await this.level.leveldb.put(list.id, JSON.stringify(list))
  }
  reply.send({ message: 'Database populated' })
}