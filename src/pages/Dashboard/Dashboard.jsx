import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import baseApi from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";
import { getToken } from "../../utils/helpers";
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

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentOrdersDate, setRecentOrdersDate] = useState([]);
  const [dataCards, setDataCards] = useState([]);

  const fetchCardStats = async () => {
    try {
      const response = await baseApi.get(ENDPOINTS.FETCH_CARD_DATA, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        const cards = [
          {
            label: "highest_cost_of_product",
            value: `$${data.highest_cost_product_all_time.cost.toFixed(2)}`,
            product_name: data.highest_cost_product_all_time.product_name,
            change: parseFloat(
              data.highest_cost_product_all_time.percentage_change.replace(
                "%",
                ""
              )
            ),
            positive:
              parseFloat(
                data.highest_cost_product_all_time.percentage_change.replace(
                  "%",
                  ""
                )
              ) >= 0,
            bgColor: "bg-red-100",
          },
          {
            label: "total_spending_cost",
            value: `$${data.total_spending.toFixed(2)}`,
            product_name: "",
            change: 0,
            positive: false,
            bgColor: "bg-green-100",
          },
          {
            label: "lowest_cost_of_product",
            value: `$${data.lowest_cost_product_all_time.cost.toFixed(2)}`,
            product_name: data.lowest_cost_product_all_time.product_name, // ✅ Fixed here
            change: parseFloat(
              data.lowest_cost_product_all_time.percentage_change.replace(
                "%",
                ""
              )
            ),
            positive:
              parseFloat(
                data.lowest_cost_product_all_time.percentage_change.replace(
                  "%",
                  ""
                )
              ) >= 0,
            bgColor: "bg-indigo-100",
          },
        ];

        setDataCards(cards);
      }
    } catch (error) {
      setApiError("Fetch error: " + error.message);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await baseApi.get(ENDPOINTS.STATISTICS, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        const transformedData = data.map(({ month, expenditure }) => ({
          month,
          Expenditure: expenditure,
        }));
        setChartData(transformedData);
      } else {
        setApiError("Error fetching statistics: " + response.statusText);
      }
    } catch (error) {
      setApiError("Fetch error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const response = await baseApi.get(ENDPOINTS.RECENT_ORDERS, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.status === 200) {
        setRecentOrders(response.data.items);
        setRecentOrdersDate(response.data.created_at);
      } else {
        setApiError("Error fetching orders: " + response.statusText);
      }
    } catch (error) {
      setApiError("Fetch error: " + error.message);
    }
  };

  useEffect(() => {
    fetchCardStats();
    fetchStatistics();
    fetchRecentOrders();
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const localizedDataCards = dataCards.map((card) => ({
    ...card,
    label: t(card.label.toLowerCase()),
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
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">{t("common.english")}</option>
            <option value="de">{t("common.german")}</option>
          </select>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col gap-10 lg:w-full">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 font-Inter">
            {localizedDataCards.map(
              (
                { label, product_name, value, change, positive, bgColor },
                i
              ) => (
                <div
                  key={i}
                  className={`${bgColor} p-5 rounded-xl shadow-md text-textClr`}
                >
                  <p className="capitalize font-normal text-[12px] mb-2 leading-[22px]">
                    {label}
                    {product_name ? (
                      <span className="text-base font-bold">
                        {" "}
                        ({product_name})
                      </span>
                    ) : (
                      ""
                    )}
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

          <section className="bg-white p-5 rounded-xl shadow-md mb-10">
            <h3 className="font-semibold text-xl font-Roboto text-textClr mb-8">
              {t("dashboard.statistic")}
            </h3>
            {loading ? (
              <div>Loading statistics...</div>
            ) : apiError ? (
              <div className="text-red-500">No Data Found</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend iconType="circle" />
                  <Bar dataKey="Expenditure" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </section>

          <div className="bg-white rounded-xl shadow-md p-5 w-full mb-10">
            <h3 className="font-semibold text-xl font-Roboto text-textClr mb-4.5">
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
                {recentOrders.map(({ item_name, category, price }, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-200 last:border-none hover:bg-gray-50 font-Inter text-sm"
                  >
                    <td className="px-1 md:px-4 py-1 md:py-3">
                      {recentOrdersDate}
                    </td>
                    <td className="px-1 md:px-4 py-1 md:py-3">{item_name}</td>
                    <td className="px-1 md:px-4 py-1 md:py-3 text-gray-400">
                      {category}
                    </td>
                    <td className="px-1 md:px-4 py-1 md:py-3">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
