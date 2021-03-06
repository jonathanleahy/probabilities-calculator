import React from 'react';
import './App.css';
import {TApiResponse, useApiGet} from "./hooks/useApiHook";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';

function App() {

    const calcs: TApiResponse = useApiGet('https://localhost:7049/calc/available', {"calcName": "CombinedWith", "a": 1, "b": 2}); // todo: should be empty

    const {
        data,
        getAPIData
    } = useApiGet('https://localhost:7049/calc', {"calcName": "CombinedWith", "a": 1, "b": 2});

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
                <Row className="justify-content-md-center">
                    <Col xs={6} md={6} lg={6}>

                        <Card style={{width: '100%'}}>
                            <Card.Body>
                                <Card.Title>Date Entry:</Card.Title><br/>
                                <Formik
                                    initialValues={{
                                        calcName: '',
                                        probabilityA: '',
                                        probabilityB: '',
                                    }}
                                    validationSchema={SignupSchema}
                                    onSubmit={values => (getAPIData('https://localhost:7049/calc', {"calcName": values.calcName, "a": values.probabilityA, "b": values.probabilityB}))}
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
                                            <br/>

                                            <Button variant="primary" type="submit">
                                                Calculate and Add to Log
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={6} lg={6}>
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
                </Row>
                <br/>
                <br/>
            </Container>
        </div>
    );
}

export default App;
