import React, {useState} from 'react';
import './App.css';
import {TApiResponse, useApiGet} from "./hooks/useApiHook";
import {Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';

function App() {

    const [a, setA] = useState('1');

    const calcs: TApiResponse = useApiGet('https://localhost:7049/calc/available', '');

    // const products = calcs.data ? calcs.data.map((acalc: any) => (
    //     JSON.stringify(acalc)
    // )) : []

    const {
        data,
        loading,
        getAPIData
    } = useApiGet('https://localhost:7049/calc', '?calcname=Combined&a=' + a + '&b=' + Math.floor(Math.random() * 10));

    const SignupSchema = Yup.object().shape({
        probabilityA: Yup.number()
            .min(0, 'Min 0')
            .max(1, 'Max 1')
            .required('Required'),
        probabilityB: Yup.number()
            .min(0, 'Min 0')
            .max(1, 'Max 1')
            .required('Required'),
        calcName: Yup.string().required("Please select a Function").oneOf(["Either", "CombinedWith"]), // todo: make dynamic
    });

    return (
        <div className="App">

            <div className="jumbotron bg-light">
                <br/>
                <h1 className="display-4">Investment Probabilities</h1>
                <br/>
            </div>
            <br/>
            <br/>

            <Container>

                {JSON.stringify(loading)}<br/>

                {JSON.stringify(data)}

                <Row className="justify-content-md-center">
                    <Col xs={1} md={1} lg={1}></Col>
                    <Col xs={5} md={5} lg={5}>

                        <Card style={{width: '100%'}}>
                            <Card.Body>
                                <Card.Title>Date Entry:</Card.Title><br/>

                                <Formik
                                    initialValues={{
                                        probabilityA: '',
                                        probabilityB: '',
                                        calcName: '',
                                    }}
                                    validationSchema={SignupSchema}
                                    onSubmit={values => (getAPIData(values))}
                                >
                                    {({errors, touched}) => (
                                        <Form>

                                            <h6>Probability A</h6>
                                            <Field name="probabilityA"/>
                                            {errors.probabilityA && touched.probabilityA ? (
                                                <div>{errors.probabilityA}</div>
                                            ) : null}
                                            <br/>
                                            <br/>

                                            <h6>Probability B</h6>
                                            <Field name="probabilityB"/>
                                            {errors.probabilityB && touched.probabilityB ? (
                                                <div>{errors.probabilityB}</div>
                                            ) : null}
                                            <br/>
                                            <br/>

                                            <Field as="select" name="calcName">
                                                <option value="">Select a Function</option>
                                                {calcs.data && calcs.data.map((calc: any, key: any) => (
                                                    <option value={calc} key={key}>{calc}</option>
                                                ))}
                                            </Field>
                                            {errors.calcName &&
                                                <div className="input-feedback">{errors.calcName}</div>
                                            }
                                            <br/>

                                            <Button variant="primary" type="submit">
                                                Calculate and Add to Log
                                            </Button>

                                        </Form>
                                    )}
                                </Formik>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={4} md={4} lg={5}>
                        <Card style={{width: '100%', height: '100%'}}>
                            <Card.Body>
                                <div style={{width: '100%', height: '100%'}}>
                                    <Card.Title>Calculation Result:</Card.Title><br/>
                                    <br/>
                                    <br/>
                                    <Card.Title>{data ? data.result : '-'}</Card.Title><br/>
                                    <br/>
                                    <Card.Subtitle className="mb-2 text-muted">Values Used:</Card.Subtitle>
                                    <Card.Text>
                                        P(A) = {data ? data.a : '-'}<br/>
                                        P(B) = {data ? data.b : '-'}<br/>
                                        Function = {data ? data.type : '-'}
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={0} md={1} lg={1}></Col>
                </Row>
                <br/>
                <br/>

                <Row className="justify-content-md-center">
                    <h3>Previous Calculations from this Session:<br/><br/></h3>
                    <Col xs={1} md={1} lg={1}></Col>
                    <Col xs={9} md={9} lg={10}>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Type of Calculation</th>
                                <th>Inputs</th>
                                <th>Result</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>@twitter</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs={1} md={1} lg={1}></Col>
                </Row>
                <br/>
                <br/>

            </Container>

        </div>
    );
}

export default App;
