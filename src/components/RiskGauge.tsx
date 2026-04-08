interface RiskGaugeProps {
  percentage: number;
  label: string;
  prediction: string;
}

export default function RiskGauge({ percentage, label, prediction }: RiskGaugeProps) {
  const getColor = () => {
    if (label === 'Recurrence') {
      return percentage > 70 ? 'bg-red-500' : percentage > 40 ? 'bg-yellow-500' : 'bg-green-500';
    } else {
      if (prediction === 'Excellent') return 'bg-green-500';
      if (prediction === 'Indeterminate') return 'bg-yellow-500';
      return 'bg-red-500';
    }
  };

  const getTextColor = () => {
    if (label === 'Recurrence') {
      return percentage > 70 ? 'text-red-600' : percentage > 40 ? 'text-yellow-600' : 'text-green-600';
    } else {
      if (prediction === 'Excellent') return 'text-green-600';
      if (prediction === 'Indeterminate') return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-lg font-bold ${getTextColor()}`}>{percentage.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-1000 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
