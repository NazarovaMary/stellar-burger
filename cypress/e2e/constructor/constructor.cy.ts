describe('тесты для react приложения Stellar Burgers', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    });

    cy.setCookie('accessToken', 'test_access_token');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test_refresh_token');
    });

    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  describe('проверка работы модальных окон', () => {
    it('модальное окно открывается при клике на ингредиент', () => {
      cy.getIngredient().first().click({ force: true });
      cy.getModal().should('exist');
    });

    it('модальное окно закрывается при клике на крестик', () => {
      cy.getIngredient().first().click({ force: true });
      cy.get('[data-cy="close-modal"]').click({ force: true });
      cy.getModal().should('not.exist');
    });

    it('модальное окно открывается с определенным ингредиентом', () => {
      cy.getIngredient()
        .contains('Краторная булка N-200i')
        .click({ force: true });
      cy.getModal().contains('Краторная булка N-200i').should('exist');
    });

    it('модальное окно закрывается при клике на область с оверлей', () => {
      cy.getIngredient().first().click({ force: true });
      cy.get('[data-cy="close-modal"]').first().click({ force: true });
      cy.getModal().should('not.exist');
    });
  });

  describe('функция добавления ингредиента', () => {
    it('ингредиенты при клике на "Добавить" отображаются в конструкторе в нужном количестве', () => {
      cy.get('[data-cy="bun"]')
        .first()
        .children()
        .contains('Добавить')
        .click({ force: true });
      cy.getConstructorBun().should('exist');
      cy.get('[data-cy="sauces"]')
        .first()
        .children()
        .contains('Добавить')
        .click({ force: true });
      cy.get('[data-cy="fillings"]')
        .first()
        .children()
        .contains('Добавить')
        .click({ force: true });
      cy.getConstructorFilling().should('exist');

      cy.getConstructorBun().should('have.length', 1);
      cy.getConstructorFilling().should('have.length', 2);
    });
  });

  describe('работа функции авторизации пользователя', () => {
    it('проверка логина и создания заказа', () => {
      const email = 'john@gmail.ru';
      const password = 'John123456';
      cy.visit('/login');
      cy.get('input[name=email]').type(email, { force: true });
      cy.get('input[name=password]').type(`${password}{enter}`, {
        force: true
      });

      cy.url().should('eq', 'http://localhost:4000/');

      cy.getCookie('accessToken').should('exist');
      cy.window().should((win) => {
        const token = win.localStorage.getItem('refreshToken');
        expect(token).to.exist;
      });

      cy.get('[data-cy="profile"]').contains('John').should('exist');

      cy.intercept('POST', '/api/orders', (req) => {
        req.reply((res) => {
          res.send({ fixture: 'orderResponse.json' });
        });
      }).as('createOrder');

      cy.get('[data-cy="bun"]')
        .first()
        .children()
        .contains('Добавить')
        .click({ force: true });
      cy.getConstructorBun().should('exist');
      cy.get('[data-cy="sauces"]')
        .first()
        .children()
        .contains('Добавить')
        .click({ force: true });
      cy.get('[data-cy="fillings"]')
        .first()
        .children()
        .contains('Добавить')
        .click({ force: true });

      cy.get('button').contains('Оформить заказ').click({ force: true });

      cy.getModal().should('exist');

      cy.wait('@createOrder').then(() => {
        cy.get('[data-cy="order-number"]').should('exist');
        cy.get('[data-cy="close-modal"]').click({ force: true });
        cy.getModal().should('not.exist');

        cy.getConstructorBun().should('have.length', 0);
        cy.getConstructorFilling().should('have.length', 0);
      });
    });
  });
});
