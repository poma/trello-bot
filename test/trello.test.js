const { expect } = require('chai')
const { getListId } = require('../src/trello')

describe('Trello', () => {
  it('Should list boards', async () => {
    const id = await getListId('Tasks', 'Inbox')
    expect(id).to.be.a('string')
  })
})
