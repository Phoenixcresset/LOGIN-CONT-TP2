export const listListsSchema = {
    tags: ['lists'],
    summary: 'List all the lists',
    response: {
        200: {
            description: 'Successful response',
            type: 'array',
            items: {
              $ref: 'ITodoList#'
            }
        }
    }
}

export const addListSchema = {
    tags: ['lists'],
    summary: 'Add a new list',
    body: {
        $ref: 'ITodoList#'
    }
}

export const updateListSchema = {
    tags: ['lists'],
    summary: 'Update an existing list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
    },
    body: {
        $ref: 'ITodoList#'
    }
}

export const addItemSchema = {
    tags: ['items'],
    summary: 'Add a new item to a list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
    },
    body: {
        $ref: 'ITodoItem#'
    }
}

export const deleteItemSchema = {
    tags: ['items'],
    summary: 'Delete an item from a list',
    params: {
        type: 'object',
        properties: {
            listId: { type: 'string' },
            itemId: { type: 'string' }
        },
        required: ['listId', 'itemId']
    }
}

export const updateItemSchema = {
    tags: ['items'],
    summary: 'Update an item in a list',
    params: {
        type: 'object',
        properties: {
            listId: { type: 'string' },
            itemId: { type: 'string' }
        },
        required: ['listId', 'itemId']
    },
    body: {
        $ref: 'ITodoItem#'
    }
}

export const populateDatabaseSchema = {
    tags: ['lists'],
    summary: 'Populate the database with some initial data'
}
