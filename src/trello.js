require('dotenv').config()
const axios = require('axios')
const { TRELLO_KEY, TRELLO_TOKEN } = process.env
const trello = axios.create({
  baseURL: 'https://api.trello.com/1',
  params: {
    key: TRELLO_KEY,
    token: TRELLO_TOKEN,
  },
})

async function getListId(boardName, listName) {
  const boards = (await trello.get('/members/me/boards?fields=name,url')).data
  const board = boards.find((b) => b.name === boardName)
  const lists = (await trello.get(`/boards/${board.id}/lists?fields=name,url`)).data
  const list = lists.find((l) => l.name === listName)
  return list.id
}

module.exports = {
  trello,
  getListId,
}
