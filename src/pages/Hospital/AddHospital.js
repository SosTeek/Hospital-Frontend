import React, { useState } from 'react'
import * as Yup from 'yup';
import {
    Modal,
    ModalBody,
    ModalFooter,
    Button,
    FormGroup,
    Label,
    ModalHeader,
    Col,
    Row,
    Container
  } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { authApi } from '../../services/api';
import {NotificationContainer, NotificationManager} from 'react-notifications';


const AddHospital = (props) => {
  const [error, setError] = useState(null);
  return (
    <>
  {!error ? <div class= 'pt-2 text-center color-red'><NotificationContainer /></div>
  : null}
<Modal
      isOpen={props.createModalOpen}
      toggle={() => props.setCreateModalOpen(!props.createModalOpen)}
      wrapClassName="modal-right"
      size="lg"
      > 
      {error ? 
            <div class= 'pt-2 text-center color-red'><NotificationContainer /></div>
    : null}

        <ModalHeader>Hospital</ModalHeader>
          <Formik 
            initialValues= {{
                hospitalName: '',
                hospitalAddress: '',
                phone: '',
                hospitalDescription: '',
                image: '',
            }}
            validationSchema={Yup.object().shape({
                hospitalName: Yup.string().required('Hospital Name is required'),
                hospitalAddress: Yup.string().required('Hospital Address is required'),
                phone: Yup.string().required('Phone is required'),
                hospitalDescription: Yup.string().required('Hospital Description is required'),
                image: Yup.string().required('Image is required'),

            })}
            onSubmit={ async values =>{
              try {
                const hospitalDatas = {
                  hospitalName: values.hospitalName,
                  hospitalAddress: values.hospitalAddress,
                  phone: values.phone,
                  hospitalDescription: values.hospitalDescription,
                  image: values.image.split('\\')[2]
                }
                await authApi.post('/api/hospital', hospitalDatas);
                props.setCreateModalOpen(false);
                setError(false);

                NotificationManager.success(null, 'Hospital Added', 4000, null, null, '');
              } catch (error) {
                setError(true);
                const message = error.response.data.message;
                NotificationManager.error(null, message, 4000, null, null, '');

              }
            }}
          >
          {({errors, touched, isSubmitting})=>(
          <Form>
          <ModalBody className='show-grid'>
            <FormGroup className="error-l-75">
          <Container>
            <Row>
            <Col xs={18} md={12}>
              <Label>Hospital Name</Label>
                  <Field
                    className="form-control"
                    name="hospitalName"
                    id="hospitalName"
                  />
                  {errors.hospitalName && touched.hospitalName ? (
                <div className='text-danger'>{errors.hospitalName}</div>
              ) : null}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={8}>
                <Label>Hospital Address</Label>
                <Field
                  className="form-control"
                  name="hospitalAddress"
                  id="hospitalAddress"
                />
                {errors.hospitalAddress && touched.hospitalAddress ? (
                <div className='text-danger'>{errors.hospitalAddress}</div>
                ) : null}
              </Col>
              <Col xs={6} md={4}>
                <Label>Contact Number</Label>
                <Field
                className="form-control"
                name="phone"
                id="phone"
                />
                {errors.phone && touched.phone ? (
                <div className='text-danger'>{errors.phone}</div>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={8}>
                <Label>Hospital Description</Label>
                <Field
                  className="form-control"
                  name="hospitalDescription"
                  id="hospitalDescription"
                />
                {errors.hospitalDescription && touched.hospitalDescription ? (
                <div className='text-danger'>{errors.hospitalDescription}</div>
                ) : null}
              </Col>
              <Col xs={6} md={4}>
                <Label>Select Hospital Image</Label>
                <Field
                type='file'
                className="form-control"
                name="image"
                id="image"
                />
                {errors.image && touched.image ? (
                <div className='text-danger'>{errors.image}</div>
                ) : null}
              </Col>
            </Row>
            </Container>
          </FormGroup>
          </ModalBody>
            <ModalFooter>
              {/* <button type="submit" class="focus:outline-none text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" >Add Hospital</button> */}
              <Button
                        color="success"
                        outline
                        type="submit"
                        disabled={isSubmitting}
                        // disabled={isError || isSubmitting || isDataSubmitting}
                      >
                        Submit
                      </Button>                      
              <Button 
                  color="danger"
                  buttonType="link"
                  outline
                  onClick={() => props.setCreateModalOpen(false)}
                  ripple="dark"
              >
              Close
              </Button>
            </ModalFooter>
            </Form>
        )}           
</Formik>
</Modal>

    </>
  )
}

export default AddHospital