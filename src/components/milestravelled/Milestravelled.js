import React, {useEffect, useState} from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import companyNames from '../../companyNames.json'
import { get } from '../../apiCalls'


function MilesTravelled({ selectedSideMenu, setloading }) {
    const [test, settest] = useState([])

    useEffect(() => { handleChange() }, [])
    const handleChange = async () => {
        setloading(true)

        const res = await get(`/company/${selectedSideMenu[1]}/miles-per-company`)
        if (res.ok) {
            const resJson = await res.json()
            resJson.forEach(e => {
                e.AirlineCompany = companyNames[e.AirlineCompany]
            });
            settest(resJson)
            console.log(test)
        }
        else{
            console.log('error')
        }
        setloading(false)

    }
    return (
        <div className='bar'>

            <BarChart width={1000} height={250} data={test}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="AirlineCompany" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="MilesTravelled" stroke='#8884d8' fill='#8884d8'  />
            </BarChart>


        </div>
    );
}

export default MilesTravelled;