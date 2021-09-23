import React from 'react';
import {
  Grid,
  Header,
  Modal,
  Button,
  Message,
  Dropdown,
  Form as FormSUI,
} from 'semantic-ui-react';

import {
  Table,
  Loader,
  From,
  Notification as NotificationWrapper,
} from '../../components';
import { LayoutWrapper } from '../../containers';

import { fetchInvoicesMock, patchInvoicesMock } from '../../mock-api';

import { INVOICES__TABLE_COLUMNS } from '../../table-configuration';

const INVOICES_FORM_ID = 'invoices';

const FormInvoices = ({ invoice, onClose, setIsModalPending }) => {
  const [formState, setFormState] = React.useState(invoice);

  const [notifications, setNotifications] = React.useState([]);
  const handleNotificationAdd = React.useCallback(
    (nextNotification) => {
      const extendedNotifications = [...notifications, nextNotification];
      setNotifications(extendedNotifications);

      setTimeout(() => {
        extendedNotifications.shift();
        setNotifications([...extendedNotifications]);
      }, 2000);
    },
    [notifications]
  );

  const handleFormInputChange = React.useCallback(
    (e) => {
      setFormState({
        ...formState,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [formState]
  );

  const handleFormSubmit = React.useCallback(() => {
    setIsModalPending(true);
    handleNotificationAdd({ message: 'Saving', color: 'yellow' });

    patchInvoicesMock(formState)
      .then(() => {
        onClose();
        setIsModalPending(false);

        handleNotificationAdd({
          message: 'Successfully Saved ',
          color: 'green',
        });
      })
      .catch((error) => {
        console.error('[FormInvoices] handleFormSubmit:', error);
        setIsModalPending(false);

        handleNotificationAdd({
          message: 'Check that all required fields are populated',
          color: 'red',
        });
      });
  }, [formState, onClose, setIsModalPending, handleNotificationAdd]);

  return (
    <>
      <From id={INVOICES_FORM_ID} onSubmit={handleFormSubmit}>
        <FormSUI.Group widths="equal">
          <FormSUI.Input
            fluid
            id="form-subcomponent-shorthand-input-invoice-number"
            name="invoiceNumber"
            label="Invoice number"
            placeholder="Invoice number"
            value={formState.invoiceNumber}
            onChange={handleFormInputChange}
            disabled
          />
          <FormSUI.Input
            fluid
            id="form-subcomponent-shorthand-input-currency"
            name="currency"
            label="Currency"
            placeholder="Currency"
            value={formState.currency}
            onChange={handleFormInputChange}
            disabled
          />
        </FormSUI.Group>
        <FormSUI.Group widths="equal">
          <FormSUI.Input
            fluid
            id="form-subcomponent-shorthand-input-amount"
            name="amount"
            label="Amount"
            placeholder="Amount"
            value={formState.amount}
            onChange={handleFormInputChange}
            // width={8}
          />
          <FormSUI.Input
            fluid
            id="form-subcomponent-shorthand-input-tax-rate"
            name="taxRate"
            label="Tax rate"
            placeholder="Tax rate"
            value={formState.taxRate}
            onChange={handleFormInputChange}
            disabled
            // width={8}
          />
        </FormSUI.Group>

        <FormSUI.TextArea
          name="note"
          label="Description"
          placeholder="Information about file..."
          // error="This field is required"
          value={formState.note}
          onChange={handleFormInputChange}
        />
      </From>

      <NotificationWrapper>
        {notifications.map((notification, notificationIndex) => (
          <Message
            key={`${notification.color}-${notificationIndex}`}
            color={notification.color}
          >
            {notification.message}
          </Message>
        ))}
      </NotificationWrapper>
    </>
  );
};

const ModalInvoices = ({ invoice, onClose }) => {
  const [isModalPending, setIsModalPending] = React.useState();

  return (
    <Modal onClose={onClose} open={Boolean(invoice)} closeIcon>
      <Modal.Header>Edit invoice</Modal.Header>
      <Modal.Content>
        <FormInvoices
          invoice={invoice}
          onClose={onClose}
          setIsModalPending={setIsModalPending}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button negative disabled={isModalPending} onClick={onClose}>
          Cancel
        </Button>
        <Button
          positive
          content="Save"
          labelPosition="right"
          icon="checkmark"
          form={INVOICES_FORM_ID}
          disabled={isModalPending}
        />
      </Modal.Actions>
    </Modal>
  );
};

const InvoicesPage = () => {
  const [isPageFetching, setIsPageFetching] = React.useState(true);
  const [pageData, setPageData] = React.useState();
  const [pageOpenedRow, setPageOpenedRow] = React.useState();

  const handleTableRowClick = React.useCallback((row) => {
    setPageOpenedRow(row);
  }, []);

  const rowProps = React.useMemo(
    () => ({
      onClick: handleTableRowClick,
    }),
    [handleTableRowClick]
  );

  const handleBtnCopyToClipboardClick = React.useCallback(() => {
    window.navigator.clipboard.writeText(JSON.stringify(pageData)).then(() => {
      // TODO:
    });
  }, [pageData]);

  React.useEffect(() => {
    fetchInvoicesMock().then((response) => {
      setPageData(response);
      setIsPageFetching(false);
    });
  }, []);

  return (
    <>
      <LayoutWrapper.Content>
        <Grid padded>
          <Grid.Row>
            <Header dividing size="huge" as="h1">
              Invoices
            </Header>
          </Grid.Row>

          {/* Actions */}
          <Grid.Row>
            <Grid.Column textAlign="right">
              <Dropdown
                text="Copy"
                icon="copy outline"
                floating
                labeled
                button
                className="icon"
                disabled={isPageFetching}
              >
                <Dropdown.Menu onClick={handleBtnCopyToClipboardClick}>
                  <Dropdown.Item>To clipboard</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid.Row>

          {/* Table */}
          <Grid.Row>
            {isPageFetching ? (
              <Loader />
            ) : (
              <Table
                columns={INVOICES__TABLE_COLUMNS}
                data={pageData}
                rowProps={rowProps}
              />
            )}
          </Grid.Row>
        </Grid>
      </LayoutWrapper.Content>

      <ModalInvoices
        invoice={pageOpenedRow}
        onClose={() => setPageOpenedRow()}
      />
    </>
  );
};

export default InvoicesPage;
