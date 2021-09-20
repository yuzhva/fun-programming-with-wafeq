# Fun programming with wafeq

👋 Welcome to the JS programming challenge

# Getting started

**1.** Install dependencies:

```bash
yarn install # yarn
npm install # npm
```

**2.** Start the server:

```bash
yarn start # yarn
npm run start # npm
```

# NOTE: while writing the code, please

- use best practices
- best practices in everything: codding, revision control, quality - choose best approaches that fit in the current situation
- the result, should be the code, which is ready for production deployment
- relax and enjoy the codding 🙃

# TODO:

- [ ] Validate Form field is required

Open the invoices page, click on the row with the Empty description. When a form with an empty description is saved - then back-end returns an error. Validate the `note` field at the front-end. Display _This field is required_ error before sending it to the API.

- [ ] Bills page should have the same behavior as Invoices one

The next Bills page features are missing:

- open modal on row click
- validate form required field
- copy table JSON to the clipboard

- [ ] BUG: Modal notifications should be visible after the modal has been closed
- [ ] BUG: Table data is not updated on modal close
- [ ] FEAT: Show notification when text copied to clipboard

### Extra:

- [ ] Create a new Expenses page

Then Expenses page should have the same behavior as the Invoices one. Use `fetchExpensesMock` and `patchExpensesMock` for API communication. Display the next table columns: Date, Account, Paid through, Currency, Description.

- [ ] Style Success Modal

Write simple success modal, using:

- `flag checkered` Icon https://react.semantic-ui.com/elements/icon/
- `color="green"` Button https://react.semantic-ui.com/elements/button/#variations-colored
- Content should be middle aligned
- Icon places in the center
- button aligned to the right of the modal.
