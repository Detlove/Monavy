import PropTypes from 'prop-types'
// @mui
import { LoadingButton } from '@mui/lab'
import { Card, Stack } from '@mui/material'
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths'
// mock
import { _invoiceAddressFrom } from '../../../../_mock'
// components
//
import InvoiceNewEditDetails from './InvoiceNewEditDetails'
import InvoiceNewEditAddress from './InvoiceNewEditAddress'
import InvoiceNewEditStatusDate from './InvoiceNewEditStatusDate'

// ----------------------------------------------------------------------

InvoiceNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentInvoice: PropTypes.object,
  handlers: PropTypes.object,
  extras: PropTypes.object
}

export default function InvoiceNewEditForm ({ isEdit, currentInvoice, handlers, extras }) {
  const { handleCreateAndSend, handleSaveAsDraft, handleSubmit } = handlers
  const { isSubmitting, loadingSave, loadingSend } = extras

  return (
    <>
      <Card>
        <InvoiceNewEditAddress />
        <InvoiceNewEditStatusDate />
        <InvoiceNewEditDetails />
      </Card>

      <Stack justifyContent='flex-end' direction='row' spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          color='inherit'
          size='large'
          variant='contained'
          loading={loadingSave && isSubmitting}
          onClick={handleSubmit(handleSaveAsDraft)}
        >
          Save as Draft
        </LoadingButton>

        <LoadingButton
          size='large'
          variant='contained'
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
        >
          {isEdit ? 'Update' : 'Create'} & Send
        </LoadingButton>
      </Stack>
    </>
  )
}
