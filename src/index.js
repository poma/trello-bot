require('dotenv').config()
const { Telegraf } = require('telegraf')
const { BOT_TOKEN } = process.env
const { trello, getListId } = require('./trello')

let listId

async function newTask(ctx) {
  const text = ctx.message.text
  if (text) {
    const res = await trello.post('/cards', { name: text, idList: listId })
    console.log(res.data)
    ctx.reply(`Task added: ${res.data.url}`)
  }
}

async function main() {
  listId = await getListId('Tasks', 'Inbox')

  const bot = new Telegraf(BOT_TOKEN)
  bot.on('message', newTask)
  bot.launch()
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
  console.log('Bot started')
}

main().catch(console.error)
