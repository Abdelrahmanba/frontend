import { Select } from 'antd';
import React, { useEffect } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import companyNames from '../../companyNames.json'
import { get } from '../../apiCalls'

const { Option } = Select



function CompanyProf({ data, selectedSideMenu, setloading, setdata }) {
    useEffect(() => {
        handleChange('WN')
    }, [])
    const handleChange = async (v) => {
        setloading(true)

        const res = await get(`/company/${v}/profit`)
        if (res.ok) {
            const resJson = await res.json()
            resJson.forEach(e => {
                e.profit =  e.profit / 1000 ;
            });
            setdata(resJson)
            console.log(data)
        }
        setloading(false)

    }
    console.log(selectedSideMenu)
    return (
        <div className='area'>

            <Select
                defaultValue={companyNames['WN']}
                style={{ width: 200, paddingBottom: 10 }}
                onChange={handleChange}
            >
                {Object.keys(companyNames).map((e) => (
                    <Option value={e} key={e}>
                        {companyNames[e]}
                    </Option>
                ))}
            </Select>

            <div className='bar' style={{marginLeft:20}}>

                <BarChart width={800} height={500} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Quarter" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="profit" fill="#8884d8" />
                </BarChart>


            </div>

        </div>
    );
}

export default CompanyProf;