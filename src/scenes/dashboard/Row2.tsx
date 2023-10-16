import DashboardBox from '@/components/dashboardBox';
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api';
import BoxHeader from '@/components/BoxHeader';
import { Palette, Troubleshoot } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import FlexBetween from '@/components/FlexBetween';

const pieData =[
  {name: "Group A", value: 600},
  {name: "Group B", value: 400},
]

const Row2 = () => {
  const {data: productData} = useGetProductsQuery();
  const {data: operationalData} = useGetKpisQuery();
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]]
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
    
    <DashboardBox gridArea="e">
      <BoxHeader title="Campaigns and Targets" sideText='+4%' />
      <FlexBetween mt=".25rem" gap="1.5rem" pr="1rem">
      <PieChart width={110} height={100} margin={{top:0, right: -10, left: 10, bottom: 0}}>
        <Pie
          stroke="none"
          data={pieData}
          innerRadius={18}
          outerRadius={38}
          paddingAngle={2}
          dataKey="value"
          >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index]} />
            ))}
          </Pie>
        </PieChart>
        <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
          <Typography variant="h5"> Targe Sales</Typography>
          <Typography m=".3rem" variant="h3" color={palette.primary[300]}>83</Typography>
          <Typography variant="h6" >Finance goals of the campaign that is desired</Typography>
        </Box>

        <Box flexBasis="40%">
          <Typography variant="h5"> Losses in Revenue</Typography>
          <Typography variant="h6">Losses are down 25%</Typography>
          <Typography mt="0.4rem" variant="h5" >Profit Margins</Typography>
          <Typography variant="h6" >Margins are up 30% from last month</Typography>
        </Box>
        </FlexBetween>
     
    </DashboardBox>
    
    <DashboardBox gridArea="f"></DashboardBox>
    </>
  )
}

export default Row2