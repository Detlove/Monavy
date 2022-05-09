import * as Yup from 'yup'
// next
import { useRouter } from 'next/router'
import NextLink from 'next/link'
// form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// @mui
import { Container, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
// routes
import { PATH_DASHBOARD } from '@routes/paths'
// hooks
import useSettings from '@hooks/useSettings'
// layouts
import Layout from '@layouts/index'
// components
import Page from '@components/Page'
import HeaderBreadcrumbs from '@components/HeaderBreadcrumbs'
import Iconify from '@components/Iconify'
import { FormProvider, RHFSelect } from '@components/hook-form'
// sections
import InvoiceNewEditForm from '@sections/@dashboard/invoice/new-edit-form'
import { useEffect, useState, useMemo } from 'react'

// ----------------------------------------------------------------------

InvoiceEdit.getLayout = function getLayout (page) {
  return <Layout>{page}</Layout>
}

const STATUS_OPTIONS = ['delivered', 'onway', 'waiting', 'draft']

// ----------------------------------------------------------------------

export default function InvoiceEdit () {
  const { themeStretch } = useSettings()

  const { query, push } = useRouter()

  const { id } = query

  const [currentInvoice, setCurrentInvoice] = useState({})

  const [loadingSave, setLoadingSave] = useState(false)

  const [loadingSend, setLoadingSend] = useState(false)

  const NewUserSchema = Yup.object().shape({
    createDate: Yup.string().nullable().required('Create date is required'),
    dueDate: Yup.string().nullable().required('Due date is required'),
    invoiceTo: Yup.mixed().nullable().required('Invoice to is required')
  })

  const defaultValues = useMemo(
    () => ({
      invoiceNumber: currentInvoice?.invoiceNumber || '17099',
      createDate: currentInvoice?.createDate || null,
      dueDate: currentInvoice?.dueDate || null,
      taxes: currentInvoice?.taxes || '',
      status: currentInvoice?.status || 'draft',
      discount: currentInvoice?.discount || '',
      buyer: currentInvoice?.buyer || 'default',
      invoiceTo: currentInvoice?.invoiceTo || null,
      items: currentInvoice?.items || [{ title: '', description: '', service: '', quantity: 0, price: 0, total: 0 }]
    }),
    [currentInvoice]
  )

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues
  })

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  const values = watch()

  const newInvoice = {
    ...values,
    items: values.items.map((item) => ({
      ...item,
      total: item.quantity * item.price
    }))
  }

  useEffect(async () => {
    const order = await window.fetch(`http://localhost:3001/orders/${id}`).then(r => r.json())
    setCurrentInvoice(order)
  }, [])

  useEffect(() => {
    reset(defaultValues)
  }, [currentInvoice])

  console.log(currentInvoice)

  const handleSaveAsDraft = async () => {
    setLoadingSave(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      reset()
      setLoadingSave(true)
      push(PATH_DASHBOARD.invoice.list)
      console.log(JSON.stringify(newInvoice, null, 2))
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreateAndSend = async () => {
    setLoadingSend(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      reset()
      setLoadingSend(false)
      push(PATH_DASHBOARD.invoice.list)
      console.log(JSON.stringify(newInvoice, null, 2))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Page title={`Pedido #${currentInvoice?.invoiceNumber}`}>
      <FormProvider methods={methods}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading='Detalles del pedido'
            links={[
              { name: 'Inicio', href: PATH_DASHBOARD.root },
              { name: 'Pedidos', href: PATH_DASHBOARD.invoice.list },
              { name: `#${currentInvoice?.invoiceNumber}` || '' }
            ]}
            action={
              <>
                <RHFSelect
                  fullWidth
                  name='status'
                  label='Cambiar estado'
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize'
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </>
            }
          />

          <InvoiceNewEditForm
            isEdit
            currentInvoice={currentInvoice}
            handlers={{ handleCreateAndSend, handleSaveAsDraft, handleSubmit }}
            extras={{ isSubmitting, loadingSave, loadingSend }}
          />
        </Container>
      </FormProvider>
    </Page>
  )
}
