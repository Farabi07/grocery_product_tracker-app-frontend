import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const expensesData = [
  { id: 1, date: '2025-05-01', product: 'Butter (Salted)', category: 'Dairy', amount: 40, ref: 'EXP-20250501-001' },
  { id: 2, date: '2025-05-01', product: 'Milk (Gallon)', category: 'Dairy', amount: 60, ref: 'EXP-20250501-002' },
  { id: 3, date: '2025-05-01', product: 'Cheese (Cheddar)', category: 'Dairy', amount: 18, ref: 'EXP-20250501-003' },
  { id: 4, date: '2025-05-01', product: 'Carrots (Bag)', category: 'Vegetables', amount: 15, ref: 'EXP-20250501-004' },
  { id: 5, date: '2025-05-01', product: 'Pork (Chops)', category: 'Meat', amount: 20, ref: 'EXP-20250501-005' },
  { id: 6, date: '2025-05-01', product: 'Pork (Chops)', category: 'Meat', amount: 20, ref: 'EXP-20250501-005' },
];

const summary = {
  totalMonthlyExpenses: 23293,
  vsPreviousMonth: -273.20,
  vsPercentage: -13,
  expenseCategories: 6,
  highestCategory: 'Other ($575.06)',
  largestSingleExpense: 'Purchase Bag ($52.05)',
  averageDailySpend: 58.82,
};

const monthlyExpensesByCategory = [
  { category: 'Dairy', amount: 118, fill: '#4caeaa' },
  { category: 'Vegetables', amount: 15, fill: '#b86fa6' },
  { category: 'Meat', amount: 40, fill: '#4053d6' },
  { category: 'Other', amount: 2900, fill: '#000000' },
  { category: 'Snacks', amount: 1200, fill: '#bfa65f' },
  { category: 'Beverages', amount: 800, fill: '#a0554b' },
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const years = [2023, 2024, 2025];

const Expenses = () => {
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [selectedYear, setSelectedYear] = useState(2025);

  const {t} = useTranslation();

  return (
    <div className="  bg-white min-h-screen font-Roboto sm:px-6 px-4 ">
      <h1 className="mt-12 md:mt-0 font-Roboto text-3xl font-semibold text-textClr leading-[22px]">{t('expense.expense')}</h1>
      <h3 className="text-2xl font-semibold text-textClr mt-9  md:mt-13 leading-[22px]">{t('expense.exp_monthly_report')}</h3>
      <p className="mt-2.5 text-sm leading-[22px] font-normal text-textClr/50 mb-8">{t('expense.exp_overview')}</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-12">
        <label className="flex items-center gap-2">
        <span className='text-sm leading-[22px] text-textClr/50'>{t('expense.report_for')}</span> &nbsp;
          <select
            className="border-[1px] border-textClr/10 rounded p-2 text-sm cursor-pointer"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((m) => (
              <option key={m} value={m} className='text-sm text-textClr/80'>{t(`months.${m}`)}</option>
            ))}
          </select>
        </label>
        <label>
          <select
            className="border-[1px] border-textClr/10 rounded p-2 text-sm cursor-pointer"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y} className='text-sm text-textClr/80'>{y}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div className=" rounded-md p-5 border-[1px] border-textClr/10 font-Roboto">
          <h4 className="text-sm text-textClr/50">{t('expense.total_month_exp')}</h4>
          <p className="text-2xl font-medium text-textClr font-Inter">${summary.totalMonthlyExpenses.toLocaleString()}</p>
          <small className="text-[12px] font-normal text-textClr/50">For {t(`months.${selectedMonth}`)}, {selectedYear}</small>
        </div>
        <div className=" rounded-md p-5 border-[1px] border-textClr/10 font-Roboto">
          <h4 className="text-sm text-textClr/50">{t('expense.prev_month')}</h4>
          <p className={`${summary.vsPreviousMonth < 0 ? 'text-red-600' : 'text-green-600'} font-medium font-Inter`}>
            ${summary.vsPreviousMonth} ({summary.vsPercentage}%)
          </p>
          <small className="text-[12px] font-normal text-textClr/50">{t('expense.dec_for_last_month')}</small>
        </div>
        <div className=" rounded-md p-5 border-[1px] border-textClr/10 font-Roboto">
          <h4 className="text-sm text-textClr/50">{t('expense.exp_category')}</h4>
          <p>{summary.expenseCategories} {t('expense.category')}</p>
          <small className="text-[12px] font-normal text-textClr/50">{t('expense.exp_analize')}</small>
        </div>
        <div className=" rounded-md p-5 border-[1px] border-textClr/10 font-Roboto">
          <h4 className="text-sm text-textClr/50">{t('expense.highest_category')}</h4>
          <p className='text-2xl font-medium font-Inter'> {summary.highestCategory}</p>
        </div>
        <div className=" rounded-md p-5 border-[1px] border-textClr/10 font-Roboto">
          <h4 className="text-sm text-textClr/50">{t('expense.single_exp')}</h4>
          <p className='text-2xl font-medium font-Inter'>{summary.largestSingleExpense}</p>
        </div>
        <div className=" rounded-md p-5 border-[1px] border-textClr/10 font-Roboto">
          <h4 className="text-sm text-textClr/50">{t('expense.avg_exp')}</h4>
          <p className='text-2xl font-medium font-Inter'>${summary.averageDailySpend}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-10">
        <h4 className="font-semibold font-Roboto text-textClr text-2xl">{t('expense.exp_monthly_category')}</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={monthlyExpensesByCategory}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="0" stroke="transparent" />
            <XAxis dataKey="category" tick={{ fontSize: 14, fill: '#333' }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" maxBarSize={40}>
              {monthlyExpensesByCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Expenses Table */}
      <div className="mb-10">
        <h4 lassName="font-semibold font-Roboto text-textClr text-2xl">{t('expense.exp_details')}</h4>
        <p className="text-sm text-textClr/50 mb-4">{t('expense.breakdown_report')}</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm mb-10 text-center">
            <thead>
              <tr className="bg-gray-200 font-Inter font-semibold  md:text-sm text-textClr/50">
                <th className="border border-gray-300 px-1 md:px-3 py-2  font-Inter text-[12px] md:text-sm ">{t('expense.date')}</th>
                <th className="border border-gray-300 px-1 md:px-3 py-2  font-Inter text-[12px] md:text-sm ">{t('expense.product')}</th>
                <th className="border border-gray-300 px-1 md:px-3 py-2  font-Inter text-[12px] md:text-sm ">{t('expense.Category')}</th>
                <th className="border border-gray-300 px-1 md:px-3 py-2  font-Inter text-[12px] md:text-sm ">{t('expense.amount')}</th>
                <th className="border border-gray-300 px-1 md:px-3 py-2  font-Inter text-[12px] md:text-sm ">{t('expense.ref')}</th>
              </tr>
            </thead>
            <tbody>
              {expensesData.map(({ id, date, product, category, amount, ref }) => (
                <tr
                  key={id}
                  className="border-b border-gray-300 last:border-none hover:bg-gray-100"
                >
                  <td className="border border-gray-300 px-1 md:px-3 py-2 font-Inter text-[12px] md:text-sm">{date}</td>
                  <td className="border border-gray-300 px-1 md:px-3 py-2 font-Inter text-[12px] md:text-sm">{product}</td>
                  <td className="border border-gray-300 px-1 md:px-3 py-2 font-Inter text-[12px] md:text-sm text-gray-400">{category}</td>
                  <td className="border border-gray-300 px-1 md:px-3 py-2 font-Inter text-[12px] md:text-sm">${amount}</td>
                  <td className="border border-gray-300 px-1 md:px-3 py-2 font-Inter text-[12px] md:text-sm text-gray-400">{ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;

