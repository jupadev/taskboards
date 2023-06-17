describe('Create board', function () {
  before((browser) => {
    browser.init()
  })
  //TODO: add e2e
  it.skip('Should show create button link', function () {
    browser.assert
      .textContains('.green', 'You did it!')
      .assert.elementHasCount('.wrapper nav a', 2)
      .strictClick('.wrapper nav a:last-child')
  })

  after((browser) => browser.end())
})
