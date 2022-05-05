import React, { useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import companyNames from '../../companyNames.json'
import { get } from '../../apiCalls'


function FlightFreq({ data, selectedSideMenu, setloading, setdata }) {
    useEffect(() => { handleChange() }, [selectedSideMenu])
    const handleChange = async () => {
        setloading(true)

        const res = await get(`/company/${selectedSideMenu[1]}/flights-per-company`)
        if (res.ok) {
            const resJson = await res.json()
            resJson.forEach(e => {
                e.AirlineCompany = companyNames[e.AirlineCompany]
            });
            setdata(resJson)
            console.log(data)
        }
        setloading(false)

    }
    return (
        <div className='bar'>

            <BarChart width={1000} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="AirlineCompany" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="flightsFreq" fill="#8884d8" />
            </BarChart>


        </div>
    );
}

export default FlightFreq; 