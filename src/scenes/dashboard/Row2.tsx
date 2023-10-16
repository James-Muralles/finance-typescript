import DashboardBox from '@/components/dashboardBox';
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api';
import BoxHeader from '@/components/BoxHeader';
import { Palette, Troubleshoot } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Row2 = () => {
  const {data: productData} = useGetProductsQuery();
  const {data: operationalData} = useGetKpisQuery();
  const { palette } = useTheme()

  const operationalExpenses = useMemo(() =>{
    return(
      operationalData && 
      operationalData[0].monthlyData.map(({month, operationalExpenses, nonOperationalExpenses}) =>{
        return {
          name: month.substring(0,3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses,
        }
      })
    )
  }, [operationalData])  

  
  return (
    <>
    <DashboardBox gridArea="d">
    <BoxHeader
        title="Operational vs Non-Operational Expenses"
        sideText='+4%'
      />
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          // width={500}
          // height={400}
          data={operationalExpenses}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 55,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <defs>
            
          </defs>
          <CartesianGrid stroke={palette.grey[800]} vertical={false} />
          <XAxis dataKey="name" style={{fontSize: "10px"}} tickLine={false}/>
          <YAxis yAxisId="left" orientation="left" style={{fontSize: "10px"}} axisLine={false} tickLine={false} />
          <YAxis yAxisId="right" orientation="right" style={{fontSize: "10px"}} axisLine={false} tickLine={false} />
          <Tooltip />
          <Line yAxisId="left" type="monotone" dataKey="Non Operational Expenses" stroke={palette.tertiary[500]}/>
          <Line yAxisId="right" type="monotone" dataKey="Operational Expenses" stroke={palette.main}/>
          </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
    <DashboardBox gridArea="e"></DashboardBox>
    <DashboardBox gridArea="f"></DashboardBox>
    </>
  )
}

export default Row2