'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList, ReferenceLine } from 'recharts';
const DEFAULT_SCORE_COLORS = {
  excellent: '#666666',
  good: '#ffa500',
  warning: '#ff6600',
  danger: '#ff0000',
} as const;

function getScoreColor(score: number): string {
  if (score >= 80) return DEFAULT_SCORE_COLORS.excellent;
  if (score >= 50) return DEFAULT_SCORE_COLORS.good;
  if (score >= 30) return DEFAULT_SCORE_COLORS.warning;
  return DEFAULT_SCORE_COLORS.danger;
}
import { ReactNode } from 'react';

export type ScoreBarChartData = {
  label: string;
  score: number;
};

type ScoreBarChartProps = {
  /**
   * 차트 데이터 배열
   */
  data: ScoreBarChartData[];

  /**
   * 차트 높이 (px)
   * @default 280
   */
  height?: number;

  /**
   * 바 너비 (px)
   * @default 32
   */
  barSize?: number;

  /**
   * 점수 기반 색상 결정 함수
   * @default (score) => score >= 80 ? '#0069FF' : score >= 50 ? '#FFA500' : '#FF0000'
   */
  getColor?: (score: number) => string;

  /**
   * 배경 바 표시 여부
   * @default true
   */
  showBackground?: boolean;

  /**
   * 배경 바 색상
   * @default '#F0F0F0'
   */
  backgroundColor?: string;

  /**
   * 기준선 표시 (점수)
   * @example 70
   */
  referenceLine?: number;

  /**
   * Y축 최대값
   * @default 100
   */
  yMax?: number;

  /**
   * Y축 눈금
   * @default [0, 50, 100]
   */
  yTicks?: number[];

  /**
   * 가로 그리드 위치 (Y좌표 배열)
   */
  horizontalGridPoints?: number[];

  /**
   * 차트 여백
   */
  margin?: { top?: number; right?: number; left?: number; bottom?: number };

  /**
   * X축 라벨 폰트 크기
   * @default 14
   */
  xAxisFontSize?: number;

  /**
   * Y축 라벨 폰트 크기
   * @default 14
   */
  yAxisFontSize?: number;

  /**
   * 바 모서리 둥글기
   * @default 16
   */
  barRadius?: number;
};


// 배경 바 컴포넌트
const CustomBackground = (props: any) => {
  const { x, y, width, height, radius } = props;
  const adjustedHeight = height - 4;
  const adjustedY = y;

  return (
    <rect
      x={x}
      y={adjustedY}
      width={width}
      height={adjustedHeight}
      fill={props.fill || '#F0F0F0'}
      rx={radius || 16}
      ry={radius || 16}
    />
  );
};

export function ScoreBarChart({
  data,
  height = 280,
  barSize = 32,
  getColor = getScoreColor,
  showBackground = true,
  backgroundColor = '#F0F0F0',
  referenceLine,
  yMax = 100,
  yTicks = [0, 50, 100],
  horizontalGridPoints,
  margin = { top: 20, right: 30, left: 0, bottom: 15 },
  xAxisFontSize = 14,
  yAxisFontSize = 14,
  barRadius = 16,
}: ScoreBarChartProps) {
  // 차트 데이터 변환
  const chartData = data.map(item => ({
    label: item.label,
    score: item.score,
  }));

  return (
    <>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          margin={margin}
          barSize={barSize}
          className={'p-2'}
        >
          <CartesianGrid
            horizontal
            vertical={false}
            stroke="#E5E7EB"
            horizontalPoints={horizontalGridPoints}
          />
          <XAxis
            dataKey="label"
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: xAxisFontSize }}
            dy={10}
          />
          <YAxis
            domain={[-2, yMax]}
            ticks={yTicks}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: yAxisFontSize }}
            dx={-10}
          />

          {/* 기준선 */}
          {referenceLine && (
            <ReferenceLine
              y={referenceLine}
              stroke="rgba(0, 0, 0, 0.5)"
              strokeDasharray="4 5"
              strokeWidth={2}
              label={({ viewBox }) => {
                const { x, y } = viewBox as { x: number; y: number };

                return (
                  <text
                    x={x - 10}
                    y={y}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize={14}
                    fontWeight="bold"
                    fill="#000"
                    opacity={0.7}
                  >
                    {`기준선 (${referenceLine})`}
                  </text>
                );
              }}
            />
          )}

          <Bar
            dataKey="score"
            radius={[barRadius, barRadius, barRadius, barRadius]}
            background={showBackground ? <CustomBackground fill={backgroundColor} radius={barRadius} /> : undefined}
            shape={(props: any) => {
              const { x, y, width, height, fill, payload } = props;
              const score = payload.score;
              // 20 미만이면 막대를 숨김
              if (score < 20) return null;
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={fill}
                  rx={barRadius}
                  ry={barRadius}
                />
              );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={getColor(entry.score)} />
            ))}
            <LabelList
              dataKey="score"
              position="insideTop"
              content={({ x, y, width, height, value, index }) => {
                const score = Math.round(Number(value) || 0);
                if (score === 0) return null;
                const entry = chartData[index as number];
                if (!entry) return null;
                const color = getColor(entry.score ?? 0);
                const cx = (x as number) + (width as number) / 2;

                // 값이 20 미만이면 차트 하단(Y축 0 근처)에 동글한 라벨만 표시
                if (score < 20) {
                  // height를 이용해서 Y축 0 위치 계산
                  // y는 막대의 상단, height는 막대의 높이
                  const barHeight = height as number;
                  const barY = y as number;
                  // score 비율로 0 위치 계산: 막대 아래 + 약간의 여백
                  const zeroY = barY + barHeight - 13;

                  return (
                    <g>
                      <circle cx={cx} cy={zeroY} r={13} fill="#fff" stroke={color} strokeWidth={2} />
                      <text
                        x={cx}
                        y={zeroY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={color}
                        fontSize={12}
                        fontWeight="bold"
                      >
                        {score}
                      </text>
                    </g>
                  );
                }

                // 값이 20 이상이면 막대 안쪽 위에 동글한 배경과 함께 표시 (기존 동작 유지)
                const cy = (y as number) + 18 - 2;
                return (
                  <g>
                    <circle cx={cx} cy={cy} r={13} fill="#fff" />
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={color}
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {score}
                    </text>
                  </g>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
