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

import { fetchBillsMock, patchBillsMock } from '../../mock-api';

import { BILLS__TABLE_COLUMNS } from '../../table-configuration';

const BILLS_FORM_ID = 'bills';

const FormBills = ({ bill, onClose, setIsModalPending }) => {
  const [formState, setFormState] = React.useState(bill);

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

    patchBillsMock(formState)
      .then(() => {
        onClose();
        setIsModalPending(false);

        handleNotificationAdd({
          message: 'Successfully Saved ',
          color: 'green',
        });
      })
      .catch((error) => {
        console.error('[FormBills] handleFormSubmit:', error);
        setIsModalPending(false);

        handleNotificationAdd({
          message: 'Check that all required fields are populated',
          color: 'red',
        });
      });
  }, [formState, onClose, setIsModalPending, handleNotificationAdd]);

  return (
    <>
      <From id={BILLS_FORM_ID} onSubmit={handleFormSubmit}>
        <FormSUI.Group widths="equal">
          <FormSUI.Input
            fluid
            id="form-subcomponent-shorthand-input-bill-number"
            name="billNumber"
            label="Bill number"
            placeholder="Bill number"
            value={formState.billNumber}
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

const ModalBills = ({ bill, onClose }) => {
  const [isModalPending, setIsModalPending] = React.useState();

  return (
    <Modal onClose={onClose} open={Boolean(bill)} closeIcon>
      <Modal.Header>Edit bill</Modal.Header>
      <Modal.Content>
        <FormBills
          bill={bill}
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
          form={BILLS_FORM_ID}
          disabled={isModalPending}
        />
      </Modal.Actions>
    </Modal>
  );
};

const BillsPage = () => {
  const isPageFetching = null,
    pageData = [],
    pageOpenedRow = null,
    setPageOpenedRow = null;

  return (
    <>
      <LayoutWrapper.Content>
        <Grid padded>
          <Grid.Row>
            <Header dividing size="huge" as="h1">
              Bills
            </Header>
          </Grid.Row>

          {/* Actions */}
          {/* <Grid.Row>
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
          </Grid.Row> */}

          {/* Table */}
          <Grid.Row>
            {isPageFetching ? (
              <Loader />
            ) : (
              <Table
                columns={BILLS__TABLE_COLUMNS}
                data={pageData}
                // rowProps={rowProps}
              />
            )}
          </Grid.Row>
        </Grid>
      </LayoutWrapper.Content>

      <ModalBills bill={pageOpenedRow} onClose={() => setPageOpenedRow()} />
    </>
  );
};

export default BillsPage;
