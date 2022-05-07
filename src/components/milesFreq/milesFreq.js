import { Select } from 'antd';
import React, { useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

import companyNames from '../../companyNames.json'
import { get } from '../../apiCalls'

const { Option } = Select



function MilesFreq({ data, selectedSideMenu, setloading, setdata }) {
    useEffect(() => {
        handleChange(companyNames['WN'])
    }, [])
    const handleChange = async (v) => {
        setloading(true)

        const res = await get(`/company/${v}/${selectedSideMenu[1]}/miles`)
        if (res.ok) {
            const resJson = await res.json()
            setdata(resJson)
        }
        setloading(false)

    }
    console.log(selectedSideMenu)
    const num = {
        1: 'First',
        2: 'Second',
        3: 'Third',
        4: 'Forth',
        d: 'Miles Per Company ',
    }
    return (
        <div className='area'>
            <h2>{num[selectedSideMenu[0]] } in the { num[selectedSideMenu[1]]}  Quarter</h2>
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

            <AreaChart
                width={1000}
                height={600}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray='0' />
                <XAxis dataKey='Miles' />
                <YAxis />
                <Tooltip />
                <Area type='monotone' dataKey='MilesFreq' stroke='#8884d8' fill='#8884d8' />
            </AreaChart>

        </div>
    );
}

export default MilesFreq;