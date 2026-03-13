'use client';

import { PieChart, Pie, Cell } from 'recharts';
import CountUp from 'react-countup';

export type DonutChartData = {
  value: number;
  color: string;
};

type DonutChartProps = {
  /**
   * 차트 데이터 배열
   * @example [{ value: 60, color: '#FF0000' }, { value: 40, color: '#E5E5E5' }]
   */
  data: DonutChartData[];

  /**
   * 중앙에 표시할 값 (숫자)
   */
  centerValue: number;

  /**
   * 중앙 값의 단위 (%, 점, 건 등)
   * @default ''
   */
  centerUnit?: string;

  /**
   * 차트 크기 (px)
   * @default 140
   */
  size?: number;

  /**
   * 도넛 외부 반지름 (px)
   * @default 60
   */
  outerRadius?: number;

  /**
   * 도넛 내부 반지름 (px)
   * @default 46
   */
  innerRadius?: number;

  /**
   * CountUp 애니메이션 키 (리프레시용)
   */
  countUpKey?: string;

  /**
   * 배경색 표시 여부
   * @default false
   */
  showBackground?: boolean;

  /**
   * 배경색
   * @default '#E8E8E8'
   */
  backgroundColor?: string;

  /**
   * 모서리 둥글게
   * @default 0
   */
  cornerRadius?: number;

  /**
   * 리프레시 키 (CountUp 애니메이션 재실행용)
   * @default 0
   */
  refreshKey?: number;
};

export function DonutChart({
  data,
  centerValue,
  centerUnit = '',
  size = 140,
  outerRadius = 60,
  innerRadius = 46,
  countUpKey,
  showBackground = false,
  backgroundColor = '#E8E8E8',
  cornerRadius = 0,
  refreshKey = 0,
}: DonutChartProps) {
  const center = size / 2;

  // 데이터를 recharts 형식으로 변환
  const chartData = data.map(item => ({ value: item.value }));

  const finalCountUpKey = countUpKey || `donut-${refreshKey}`;

  // 차트 크기에 비례하여 텍스트 크기 계산
  // 기준: size 140 = 36px, size 160 = 26px (비율 유지)
  const valueFontSize = Math.round(size * 0.15); // 140 * 0.257 ≈ 36
  const unitFontSize = Math.round(size * 0.11); // 140 * 0.114 ≈ 16

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <PieChart width={size} height={size}>
        {/* 배경 원 */}
        {showBackground && (
          <Pie
            data={[{ value: 100 }]}
            cx={center}
            cy={center}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            strokeWidth={0}
            isAnimationActive={false}
          >
            <Cell fill={backgroundColor} />
          </Pie>
        )}

        {/* 실제 데이터 */}
        <Pie
          data={chartData}
          cx={center}
          cy={center}
          startAngle={90}
          endAngle={-270}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          dataKey="value"
          strokeWidth={0}
          cornerRadius={cornerRadius}
          paddingAngle={5}
        >
          {data.map((item, index) => (
            <Cell key={`cell-${index}`} fill={item.color} />
          ))}
        </Pie>
      </PieChart>

      {/* 중앙 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center mt-2 ml-2">
        <span className="font-bold font-gmarket text-gray-900" style={{ fontSize: `${valueFontSize}px` }}>
          <CountUp key={finalCountUpKey} end={centerValue} duration={1.5} />
          {centerUnit && <span className="font-medium" style={{ fontSize: `${unitFontSize}px` }}>{centerUnit}</span>}
        </span>
      </div>
    </div>
  );
}
