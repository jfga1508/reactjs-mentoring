import Counter from './Counter'

describe('Counter Component', () => {
  beforeEach(() => {
    cy.mount(<Counter initial={5} />);
  });

  it('Test that component renders initial value provided in props', () => {
    cy.get('span').should('have.text', '5');
  });

  it('Test that a click event on "decrement" button decrements the displayed value', () => {
    cy.get('button').contains('-').click();
    cy.get('span').should('have.text', '4');
  });

  it('Test that a click event on "increment" button increments the displayed value', () => {
    cy.get('button').contains('+').click();
    cy.get('span').should('have.text', '6');
  });
});