import React, {useEffect, useState} from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import companyNames from '../../companyNames.json'
import { get } from '../../apiCalls'


function ProfitPerCompany({  selectedSideMenu, setloading }) {
    const [test, settest] = useState([])

    useEffect(() => { handleChange() }, [])
    const handleChange = async () => {
        setloading(true)

        const res = await get(`/company/${selectedSideMenu[1]}/profit-per-company`)
        if (res.ok) {
            const resJson = await res.json()
            resJson.forEach(e => {
                e.AirlineCompany = companyNames[e.AirlineCompany]
                e.profitsSum = e.profitsSum / 1000;
            });
            settest(resJson)
            console.log(test)
        }
        else{
            console.log('error')
        }
        setloading(false)

    }
    const num = {
        1: 'First',
        2: 'Second',
        3: 'Third',
        4: 'Forth',
        p: 'Profit Per Company',
    }
    return (
        <div className={'bar'} style={{marginLeft:20}}>
            <h2 style={{marginLeft:50}}>{num[selectedSideMenu[0]] } in the { num[selectedSideMenu[1]]}  Quarter</h2>

            <BarChart width={1000} height={500} data={test}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="AirlineCompany" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="profitsSum" stroke='#8884d8' fill='#8884d8' />
            </BarChart>


        </div>
    );
}

export default ProfitPerCompany;