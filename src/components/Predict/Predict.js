import React, {Component, useEffect, useState} from 'react';
import {Input,message} from 'antd';
import { Modal, Button } from 'antd';
import '../../pages/sign/sign.scss'

import {post} from '../../apiCalls'

function Predict ({setloading}) {

    const [MktCoupons, setMktCoupons] = useState('')
    const [Origin, setOrigin] = useState('')
    const [Quarter, setQuarter] = useState('')
    const [Destination, setDestination] = useState('')
    const [ContiguousUSA, setContiguousUSA] = useState('')
    const [NumTicketsOrdered, setNumTicketsOrdered] = useState('')
    const [AirlineCompany, setAirlineCompany] = useState('')

    const Postdata = async () => {
        try{
            setloading(true)
            const res = await post('/ticket/predict/', undefined,
                        {
                            "MktCoupons":MktCoupons,
                            "Quarter": Quarter,
                            "Origin": Origin,
                            "Dest": Destination,
                            "ContiguousUSA": ContiguousUSA,
                            "NumTicketsOrdered": NumTicketsOrdered,
                            "AirlineCompany": AirlineCompany
                        })

                            const resJSON = await res.json()
                            console.log(resJSON.prediction)


                            if (res.ok) {
                                const modal = Modal.success();

                                modal.update(prevConfig => ({
                                    ...prevConfig,
                                    title: (<h2>2018 Airplane Flights</h2>
                                    ),
                                    content: <h2 style={{fontSize: 20}}>The price for Airline Company {AirlineCompany} from Origin {Origin} to Destination {Destination} is <span style={{fontSize:22}}>{resJSON.prediction.toFixed(2) }$</span></h2>,
                                }));
                                setloading(false)
                            } else {
                                message.error('make sure to fill all fields')
                                setloading(false)

                                console.log("failed")
                            }

        } catch (e) {
                console.log(e)
            }

        }

    return (

                <div style={{paddingLeft:100}}>

                    <h1> Predicting prices of airline flights!</h1>
                    <div>
                        <span style={{marginLeft: 20, fontWeight: 600}}>MktCoupons   </span>
                        <Input
                            name={'MktCoupons'}
                            style={{width: 200, borderRadius:50, marginBottom: 10, marginLeft: 70}}
                            placeholder='MktCoupons'
                            className='input'
                            value={MktCoupons}
                            onChange={(e) => setMktCoupons(e.target.value)}/>
                    </div>


                    <div>
                        <span style={{marginLeft: 20, fontWeight: 600}}>Quarter   </span>
                        <Input name={'Quarter'}
                                style={{width: 200, borderRadius:50, marginBottom: 10, marginLeft: 100}}
                               placeholder='Quarter'
                               className='input'
                               value={Quarter}
                               onChange={(e) => setQuarter(e.target.value)}
                        />
                    </div>
                    <div>
                        <span style={{marginLeft: 20, fontWeight: 600}}>Origin  </span>
                        <Input
                            name={'Origin'}
                            style={{width: 200, borderRadius:50, marginBottom: 10, marginLeft: 110}}
                            placeholder='Origin'
                            className='input'
                            value={Origin}
                            onChange={(e) => setOrigin(e.target.value)}/>
                    </div>
                    <div>
                        <span style={{marginLeft: 20, fontWeight: 600}}>Destination  </span>
                        <Input
                            name={'Destination'}
                            style={{width: 200, borderRadius:50, marginBottom: 10, marginLeft: 78}}
                            placeholder='Destination'
                            className='input'
                            value={Destination}
                            onChange={(e) => setDestination(e.target.value)}/>
                    </div>
                    <div>
                        <span style={{marginLeft: 20, fontWeight: 600}}>ContiguousUSA  </span>
                        <Input name={'ContiguousUSA'}
                               style={{width: 200, borderRadius:50, marginBottom: 10,marginLeft: 52}}
                               placeholder='ContiguousUSA'
                               className='input'
                               value={ContiguousUSA}
                               onChange={(e) => setContiguousUSA(e.target.value)}
                        />
                    </div>
                    <div>
                        <span style={{marginLeft: 20, fontWeight: 600}}>NumTicketsOrdered </span>
                        <Input
                            name={'NumTicketsOrdered'}
                            style={{width: 200, borderRadius:50, marginBottom: 10, marginLeft: 25}}
                            placeholder='NumTicketsOrdered'
                            className='input'
                            value={NumTicketsOrdered}
                            onChange={(e) => setNumTicketsOrdered(e.target.value)}/>
                    </div>
                    <div>
                        <span style={{marginLeft: 20, fontWeight: 600}}>AirlineCompany </span>
                        <Input
                            name={'AirlineCompany'}
                            style={{width: 200, borderRadius:50, marginBottom: 10, marginLeft: 50}}
                            placeholder='AirlineCompany'
                            className='input'
                            value={AirlineCompany}
                            onChange={(e) => setAirlineCompany(e.target.value)}/>
                    </div>
                    <div>
                        <Button type={'primary'}
                                shape='round'
                                size={'middle'}
                                style={{width: 100, marginLeft: 170, marginTop:20 }}
                                 onClick={Postdata}>submit</Button>
                    </div>

                </div>


            );

}
export default Predict;