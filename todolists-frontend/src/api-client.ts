import axios from 'axios'

export const apiClient = {
    getLists: async () => {
        const response = await axios.get('http://localhost:3000/lists')
        const lists_names = response.data.map((list: any) => list.description)
        console.debug('-- getLists', lists_names);
        return Promise.resolve(lists_names)
    },
    addList: async (listName: string) => {
        const response = await axios.get('http://localhost:3000/lists')
        const lists_count = response.data.length
        const lists_names = response.data.map((list: any) => list.description)
        const new_id = lists_count + 1
        const new_list = { id: new_id, description: listName, items: [] }
        await axios.post('http://localhost:3000/lists', new_list)
        console.debug('-- addList', listName, lists_names);
        const new_response = await axios.get('http://localhost:3000/lists')
        const new_lists_names = new_response.data.map((list: any) => list.description)
        return Promise.resolve(new_lists_names)
    },
    getTodos: async (listName: string): Promise<string[]> => {
        const response = await axios.get('http://localhost:3000/lists')
        const lists = response.data
        const list = lists.find((list: any) => list.description === listName)
        const todos = list.items
        const todos_names = todos.map((todo: any) => todo.description)
        console.debug('-- getTodos', listName, todos_names);
        return Promise.resolve(todos_names)
    },
    addTodo: async (listName: string, todo: string) => {
        const response = await axios.get('http://localhost:3000/lists')
        const lists = response.data
        const list = lists.find((list: any) => list.description === listName)
        const new_id = list.items.length + 1
        const new_todo = { id: new_id, description: todo, status: 'PENDING' }
        await axios.post(`http://localhost:3000/lists/${list.id}/items`, new_todo)
        const new_response = await axios.get('http://localhost:3000/lists')
        const new_lists = new_response.data
        const new_list = new_lists.find((list: any) => list.description === listName)
        const new_todos = new_list.items
        const new_todos_names = new_todos.map((todo: any) => todo.description)
        console.debug('-- addTodo', listName, todo, new_todos_names);
        return Promise.resolve(new_todos_names)
    }
}