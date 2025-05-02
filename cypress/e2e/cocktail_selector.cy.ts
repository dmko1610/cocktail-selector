describe('Cocktail Selector App', () => {
  beforeEach(() => {
    cy.visit('https://cocktail-selector-nine.vercel.app/');
  });

  it('must load main page and display Margarita', () => {
    cy.contains('Margarita');
  });

  it('must navigate to Mojito cocktail page', () => {
    cy.contains('Mojito').click();
    cy.url().should('include', '/mojito');
    cy.contains('Mojito');
  });

  it('must display 404 error on navigating to the non-existent page', () => {
    cy.visit('https://cocktail-selector-nine.vercel.app/nonexistent');
    cy.contains('404');
  });

  it('must display correct active item on sidebar', () => {
    cy.contains('Margarita').click();
    cy.contains('Margarita').should('have.class', 'active');
  });
});
