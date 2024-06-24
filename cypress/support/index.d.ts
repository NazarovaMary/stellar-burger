declare namespace Cypress {
    interface Chainable {
      getIngredient(): Chainable<JQuery<HTMLElement>>;
      getModal(): Chainable<JQuery<HTMLElement>>;
      getConstructorBun(): Chainable<JQuery<HTMLElement>>;
      getConstructorFilling(): Chainable<JQuery<HTMLElement>>
    }
  }
  