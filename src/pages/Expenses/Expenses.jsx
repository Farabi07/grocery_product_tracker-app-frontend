import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import baseApi from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";
import { getToken } from "../../utils/helpers";

// Detailed Expenses Static \\
// const expensesData = [
//   {
//     id: 1,
//     date: "2025-05-01",
//     product: "Butter (Salted)",
//     category: "Dairy",
//     amount: 40,
//     ref: "EXP-20250501-001",
//   },
//   {
//     id: 2,
//     date: "2025-05-01",
//     product: "Milk (Gallon)",
//     category: "Dairy",
//     amount: 60,
//     ref: "EXP-20250501-002",
//   },
//   {
//     id: 3,
//     date: "2025-05-01",
//     product: "Cheese (Cheddar)",
//     category: "Dairy",
//     amount: 18,
//     ref: "EXP-20250501-003",
//   },
//   {
//     id: 4,
//     date: "2025-05-01",
//     product: "Carrots (Bag)",
//     category: "Vegetables",
//     amount: 15,
//     ref: "EXP-20250501-004",
//   },
//   {
//     id: 5,
//     date: "2025-05-01",
//     product: "Pork (Chops)",
//     category: "Meat",
//     amount: 20,
//     ref: "EXP-20250501-005",
//   },
//   {
//     id: 6,
//     date: "2025-05-01",
//     product: "Pork (Chops)",
//     category: "Meat",
//     amount: 20,
//     ref: "EXP-20250501-005",
//   },
// ];

// Monthly Expenses Summary Report \\
const summary = {
  totalMonthlyExpenses: 23293,
  vsPreviousMonth: -273.2,
  vsPercentage: -13,
  expenseCategories: 6,
  highestCategory: "Other ($575.06)",
  largestSingleExpense: "Purchase Bag ($52.05)",
  averageDailySpend: 58.82,
};

// Month's list \\
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = [2023, 2024, 2025];
const categoryColors = {
  Dairy: "#4caeaa",
  Vegetables: "#b86fa6",
  Meat: "#4053d6",
  Snacks: "#bfa65f",
  Beverages: "#a0554b",
  Other: "#000000",
};
const Expenses = () => {
  const date = new Date();
  const [selectedMonth, setSelectedMonth] = useState(months[date.getMonth()]);
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [largestSingleExpense, setLargestSingleExpense] = useState({});
  const [highestCategory, setHighestCategory] = useState({});
  const [totalExpenses, setTotalExpenses] = useState("");
  const [average_daily_spend, setAverage_daily_spend] = useState(0);
  const [vsPreviousMonth, setVsPreviousMonth] = useState(0);
  const [vsPercentage, setVsPercentage] = useState(0);
  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const [categoryLength, setCategoryLength] = useState(0);

  const { t } = useTranslation();
  const today = new Date();

  // add color codes with spending \\
  const transformedData = (response) => {
    let data = Object.entries(response.data.spending_by_category).map(
      ([category, amount]) => ({
        category,
        amount,
        fill: categoryColors[category] || "#888888", // fallback color
      })
    );
    console.log("Transform data is: ", data);
    return data;
  };

  const fetchExpensesData = async (
    month = today.getMonth() + 1,
    year = today.getFullYear()
  ) => {
    try {
      const resUrl = ENDPOINTS.EXPENSES_STATISTICS + year + "/" + month;
      const response = await baseApi.get(resUrl, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log(resUrl);
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data;
        setMonthlyExpenses(transformedData(response));
        setExpenses(data.expenses);
        setLargestSingleExpense(data.largest_single_expense);
        setHighestCategory(data.highest_category);
        setTotalExpenses(data.total_expenses);
        setVsPreviousMonth(data.previous_month_expenses);
        setVsPercentage(data.change_from_previous_month);
        setAverage_daily_spend(data.average_daily_spend);

        setCategoryLength(
          Object.values(response.data.spending_by_category).filter(
            (value) => value !== 0
          ).length
        );

        // console.log(data);
        setLoading(false);
      } else {
        setApiError("Error fetching statistics: " + error.message);
        setLoading(false);
      }
    } catch (error) {
      setApiError("Error fetching statistics: " + error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch ExpensesData on load
  useEffect(() => {
    fetchExpensesData();
  }, []);

  return (
    <div className="  bg-white min-h-screen font-Roboto sm:px-6 px-4 ">
      <h1 className="mt-12 md:mt-0 font-Roboto text-3xl font-semibold text-textClr leading-[22px]">
        {t("expense.expense")}
      </h1>
      <h3 className="text-2xl font-semibold text-textClr mt-9  md:mt-13 leading-[22px]">
        {t("expense.exp_monthly_report")}
      </h3>
      <p className="mt-2.5 text-sm leading-[22px] font-normal text-textClr/50 mb-8">
        {t("expense.exp_overview")}
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-12">
        <label className="flex items-center gap-2">
          <span className="text-sm leading-[22px] text-textClr/50">
            {t("expense.report_for")}
          </span>{" "}
          &nbsp;
          <select
            className="border-[1px] border-textClr/10 rounded p-2 text-sm cursor-pointer"
            value={selectedMonth}
            onChange={(e) => {
              const newMonth = e.target.value;
              setSelectedMonth(newMonth);
              const monthIndex = months.indexOf(newMonth) + 1; // <- use new value
              fetchExpensesData(monthIndex, selectedYear);
            }}
          >
            {months.map((m) => (
              <option key={m} value={m} className="text-sm text-textClr/80">
                {t(`months.${m}`)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <select
            className="border-[1px] border-textClr/10 rounded p-2 text-sm cursor-pointer"
            value={selectedYear}
            onChange={(e) => {
              const newYear = Number(e.target.value);
              setSelectedYear(newYear);
              const monthIndex = months.indexOf(selectedMonth) + 1;
              fetchExpensesData(monthIndex, newYear);
            }}
          >
            {years.map((y) => (
              <option key={y} value={y} className="text-sm text-textClr/80">
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div className=" rounded-md p-5 border-[1px] border-textClr/10 font-Roboto">
          <h4 className="text-sm text-textClr/50">
            {t("expense.total_month_exp")}
          </h4>
          <p className="text-2xl font-medium text-textClr font-Inter">
            {/* ${summary.totalMonthlyExpenses.toLocaleString()} */}
            {totalExpenses || "NA"}
          </p>
          <small className="text-[12px] font-normal text-textClr/50">
            For {t(`months.${selectedMonth}`)}, {selectedYear}
          </small>
        </div>
        <div className=" rounded-md p-5 border-[1px] border-textClr/10 font-Roboto">
          <h4 className="text-sm text-textClr/50">{t("expense.prev_month")}</h4>
          <p
            className={`${
              1 >= vsPercentage ? "text-red-600" : "text-green-600"
            } font-medium font-Inter`}
          >
            ${vsPreviousMonth} ({vsPercentage}%)
          </p>
          <small className="text-[12px] font-normal text-textClr/50">
            {t("expense.dec_for_last_month")}
          </small>
        </div>
        <div className=" rounded-md p-5 border-[1px] border-textClr/10 font-Roboto">
          <h4 className="text-sm text-textClr/50">
            {t("expense.exp_category")}
          </h4>
          <p>
            {categoryLength} {t("expense.category")}
          </p>
          <small className="text-[12px] font-normal text-textClr/50">
            {t("expense.exp_analize")}
          </small>
        </div>
        <div className=" rounded-md p-5 border-[1px] border-textClr/10 font-Roboto">
          <h4 className="text-sm text-textClr/50">
            {t("expense.highest_category")}
          </h4>
          <p className="text-2xl font-medium font-Inter">
            {/* {" "} */}
            {`${highestCategory.name || "NA"} ($${
              highestCategory.amount || "0"
            })`}
          </p>
        </div>
        <div className=" rounded-md p-5 border-[1px] border-textClr/10 font-Roboto">
          <h4 className="text-sm text-textClr/50">{t("expense.single_exp")}</h4>
          <p className="text-2xl font-medium font-Inter">
            {`${largestSingleExpense.product || "NA"} ($${
              largestSingleExpense.amount || "0"
            })`}
          </p>
        </div>
        <div className=" rounded-md p-5 border-[1px] border-textClr/10 font-Roboto">
          <h4 className="text-sm text-textClr/50">{t("expense.avg_exp")}</h4>
          <p className="text-2xl font-medium font-Inter">
            {average_daily_spend || "NA"}
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-10">
        <h4 className="font-semibold font-Roboto text-textClr text-2xl">
          {t("expense.exp_monthly_category")}
        </h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={monthlyExpenses}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="0" stroke="transparent" />
            <XAxis dataKey="category" tick={{ fontSize: 14, fill: "#333" }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" maxBarSize={40}>
              {monthlyExpenses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Expenses Table */}
      <div className="mb-10">
        <h4 lassName="font-semibold font-Roboto text-textClr text-2xl">
          {t("expense.exp_details")}
        </h4>
        <p className="text-sm text-textClr/50 mb-4">
          {t("expense.breakdown_report")}
        </p>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse text-sm mb-6 w-full text-center">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-xs md:text-sm">
                <th className="border border-gray-300 px-2 py-2 whitespace-nowrap">
                  {t("expense.date")}
                </th>
                <th className="border border-gray-300 px-2 py-2 whitespace-nowrap">
                  {t("expense.product")}
                </th>
                <th className="border border-gray-300 px-2 py-2 whitespace-nowrap">
                  {t("expense.Category")}
                </th>
                <th className="border border-gray-300 px-2 py-2 whitespace-nowrap">
                  {t("expense.amount")}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.map(
                ({ id, date, product, category, amount }) => (
                  <tr
                    key={id}
                    className="hover:bg-gray-100 text-xs md:text-sm border-b border-gray-200"
                  >
                    <td className="border border-gray-300 px-2 py-2 whitespace-nowrap">
                      {date}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 whitespace-nowrap">
                      {product}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 whitespace-nowrap text-gray-500">
                      {category}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 whitespace-nowrap">
                      ${amount}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="w-full flex justify-center items-center mt-5 mb-10">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                Previous
              </button>

              <span className="text-sm font-medium text-textClr/60 px-3 py-1 border rounded border-gray-200">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
