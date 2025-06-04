
import React from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const dataCards = [
  {
    label: "Data label",
    value: "7,293",
    change: 5.23,
    positive: true,
    bgColor: "bg-red-100",
  },
  {
    label: "Data label",
    value: "29,473",
    change: 6.73,
    positive: false,
    bgColor: "bg-green-100",
  },
  {
    label: "Data label",
    value: "67,293",
    change: 5.23,
    positive: true,
    bgColor: "bg-indigo-100",
  },
];

const chartData = [
  { month: "Jan", Expenditure: 4000, Profit: 2400 },
  { month: "Feb", Expenditure: 3000, Profit: 1398 },
  { month: "Mar", Expenditure: 2000, Profit: 9800 },
  { month: "Apr", Expenditure: 2780, Profit: 3908 },
  { month: "May", Expenditure: 1890, Profit: 4800 },
  { month: "Jun", Expenditure: 2390, Profit: 3800 },
  { month: "Jul", Expenditure: 3490, Profit: 4300 },
  { month: "Aug", Expenditure: 3000, Profit: 3000 },
  { month: "Sep", Expenditure: 2000, Profit: 3500 },
  { month: "Oct", Expenditure: 2780, Profit: 4000 },
  { month: "Nov", Expenditure: 1890, Profit: 3200 },
  { month: "Dec", Expenditure: 2390, Profit: 4300 },
];

const recentOrders = [
  {
    date: "2025-05-01",
    product: "Butter (Salted)",
    category: "Dairy",
    amount: "$40",
  },
  {
    date: "2025-05-01",
    product: "Milk (Gallon)",
    category: "Dairy",
    amount: "$60",
  },
  {
    date: "2025-05-01",
    product: "Cheese (Cheddar)",
    category: "Dairy",
    amount: "$18",
  },
  {
    date: "2025-05-01",
    product: "Carrots (Bag)",
    category: "Vegetables",
    amount: "$15",
  },
  {
    date: "2025-05-01",
    product: "Pork (Chops)",
    category: "Meat",
    amount: "$20",
  },
  {
    date: "2025-05-01",
    product: "Pork (Chops)",
    category: "Meat",
    amount: "$20",
  },
];

const activities = [
  {
    id: 1,
    name: "Tom",
    text: "Recently added a receipt",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Krish",
    text: "Recently edited a receipt",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Tom",
    text: "Recently added receipt",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 4,
    name: "Tom",
    text: "Recently added receipt",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 5,
    name: "Krish",
    text: "Recently edited a receipt",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 6,
    name: "Krish",
    text: "Recently edited a receipt",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const Dashboard = () => {
  const { t, i18n } = useTranslation();



  // Function to change the language
  const changeLanguage = (lang)=>{
    i18n.changeLanguage(lang);
     
  }
  // Translate dataCard labels by mapping original label to snake_case keys
  const localizedDataCards = dataCards.map((card) => ({
    ...card,
    label: t(card.label.toLowerCase().replace(/\s/g, "_")),
  }));

  return (
    <div className="px-4 sm:px-6 min-h-screen bg-gray-50 text-gray-800 box-border">
      <header className="mt-10 md:mt-0 flex flex-col md:flex-row justify-between mb-6">
        <h1 className="font-Roboto text-[2rem] font-semibold text-textClr">
          {t("dashboard.title")}
        </h1>
        <div className="max-w-md md:w-[200px]">
          <label className="block mb-1 font-Inter text-base font-medium">
            {t("dashboard.select_language")}
          </label>
          <select
            className="w-full p-2 rounded-md border border-gray-300 text-sm cursor-pointer bg-white shadow-md"
            // defaultValue={i18n.language}
            value={i18n.language}
            // onChange={changeLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">{t("common.english")}</option>
            <option value="de">{t("common.german")}</option>
          </select>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col gap-10 lg:w-[80%] w-full">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 font-Inter">
            {localizedDataCards.map(
              ({ label, value, change, positive, bgColor }, i) => (
                <div
                  key={i}
                  className={`${bgColor} p-5 rounded-xl shadow-md text-textClr `}
                >
                  <p className="uppercase font-normal text-base mb-2 leading-[22px]">
                    {label}
                  </p>
                  <h2 className="text-[2rem] font-medium mb-2">{value}</h2>
                  <p
                    className={`text-sm font-medium flex gap-x-2 items-center ${
                      positive ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {positive ? (
                      <FaCaretUp size={22} />
                    ) : (
                      <FaCaretDown size={22} />
                    )}{" "}
                    {change}%
                  </p>
                </div>
              )
            )}
          </section>

          {/* statics section  */}

          <section className="bg-white p-5 rounded-xl shadow-md mb-10 ">
            <h3 className="font-semibold text-xl font-Roboto leading-[22px] text-textClr mb-8">
              {t("dashboard.statistic")}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend iconType="circle" />
                <Bar dataKey="Expenditure" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </section>

         {/* recent order section  */}
          <div className="bg-white rounded-xl shadow-md p-5 w-full mb-10">
            <h3 className="font-semibold text-xl font-Roboto leading-[22px] text-textClr mb-4.5">
              {t("dashboard.recent_orders")}
            </h3>
            <table className="w-full border border-gray-200 text-sm text-center">
              <thead>
                <tr className="bg-gray-100 font-semibold font-Inter text-[12px] md:text-sm text-textClr/50">
                  <th className="px-1 md:px-4 py-1 md:py-3">
                    {t("dashboard.date")}
                  </th>
                  <th className="px-1 md:px-4 py-1 md:py-3">
                    {t("dashboard.product")}
                  </th>
                  <th className="px-1 md:px-4 py-1 md:py-3">
                    {t("dashboard.category")}
                  </th>
                  <th className="px-1 md:px-4 py-1 md:py-3">
                    {t("dashboard.amount")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(({ date, product, category, amount }, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-200 last:border-none hover:bg-gray-50 font-Inter text-sm"
                  >
                    <td className="px-1 md:px-4 py-1 md:py-3">{date}</td>
                    <td className="px-1 md:px-4 py-1 md:py-3">{product}</td>
                    <td className="px-1 md:px-4 py-1 md:py-3 text-gray-400">{category}</td>
                    <td className="px-1 md:px-4 py-1 md:py-3">{amount}</td>  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 flex-1 min-w-[280px] max-h-[620px] overflow-y-auto lg:w-[20%] w-full border border-textClr/10 mb-10">
          <h3 className="text-2xl font-bold mb-4">
            {t("dashboard.activities")}
          </h3>
          {activities.map(({ id, name, text, avatar }) => (
            <div
              key={id}
              className="flex items-center bg-[#F3F3F3] p-3 mb-4 last:mb-0 rounded-2xl"
            >
              <img
                src={avatar}
                alt={name}
                className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500 mr-4"
              />
              <div>
                <p className="font-bold text-gray-800 text-base">{name}</p>
                <p className="text-gray-500 text-sm">
                  
                  {t(text.toLowerCase().replace(/\s/g, "_"))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

