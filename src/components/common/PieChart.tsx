import { PieChart, Pie } from 'recharts'

interface Props {
  data: { name: string; value: number; fill?: string }[]
  color: string
}

const SimplePie = ({ data, color }: Props) => (
  <PieChart width={200} height={200}>
    <Pie
      data={data}
      dataKey="value"
      fill={color}
      label={false}
    />
  </PieChart>
)
