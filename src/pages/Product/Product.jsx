import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const initialCategories = [
  { id: 1, name: "Dairy", items: ["Milk", "Paneer", "Butter"] },
  { id: 2, name: "Meat", items: ["Chicken", "Mutton", "Beef"] },
  {
    id: 3,
    name: "Fruits",
    items: ["Apple", "Mango", "Banana", "Orange", "Pineapple"],
  },
  {
    id: 4,
    name: "Vegetables",
    items: ["Spinach", "Carrot", "Broccoli", "Cauliflower"],
  },
];

const Product = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryItems, setNewCategoryItems] = useState("");

  // Translation hook
  const { t } = useTranslation(); // Use the i18next hook for translation

  // Handle delete category
  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  // Handle add new category
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    const itemsArray = newCategoryItems
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const newCategory = {
      id: categories.length ? categories[categories.length - 1].id + 1 : 1,
      name: newCategoryName.trim(),
      items: itemsArray,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setNewCategoryItems("");
    setShowModal(false);
  };

  return (
    <div className="p-5  text-textClr bg-white min-h-screen font-Roboto">
      <h2 className="mt-5 md:mt-0 text-3xl  font-semibold mb-12 md:mb-16">
        {t("product.product")}
      </h2>

      <section className="bg-white rounded-[10px] border-[1px] border-textClr/10 p-6 mb-8">
        <h3 className="text-2xl font-semibold leading-[22px] mb-1.5">
          {t("product.prod_management")}
        </h3>
        <p className="text-sm font-normal text-textClr/50 mb-1.5">
          {t("product.prod_manage_desc")}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold font-Inter py-2 px-4 rounded-md mb-5 transition-all duration-300 ease-in"
        >
          {t("product.add_category")}
        </button>

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-textClr/10 text-[12px] md:text-sm text-textClr/50">
              <th className="text-left py-2 md:py-3 px-1 md:px-4 text-gray-500 font-semibold">
                {t("product.cate_name")}
              </th>
              <th className="text-left py-2 md:py-3 px-1 md:px-4 text-gray-500 font-semibold">
                {t("product.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map(({ id, name }) => (
              <tr
                key={id}
                className="hover:bg-gray-50 transition text-[12px] md:text-sm"
              >
                <td className="py-2 px-3 font-medium">{name}</td>
                <td className="py-2 px-3 flex flex-col gap-1 md:flex-row">
                  <button className="cursor-pointer font-Inter bg-gray-300  font-medium py-1 px-3 rounded mr-2 transition">
                    {t("common.edit")}
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(id)}
                    className="font-Inter cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition"
                  >
                    {t("common.delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

 {/* Category Details Section  */}
      <section className="bg-white border-[1px] border-textClr/10 rounded-lg shadow p-6 font-Roboto text-textClr">
        <h3 className="text-3xl font-semibold mb-2">
          {t("product.category_details")}
        </h3>
        <p className="text-sm text-textClr/50 mb-8">
          {t("product.manage_items")}
        </p>

        <table className="w-full text-sm border-collapse ">
          <thead>
            <tr className="border-b border-textClr/10 text-[12px] md:text-sm text-textClr/50">
              <th className="text-left py-2 px-1 md:px-3  font-semibold">
                {t("product.cate_name")}
              </th>
              <th className="text-left py-2 px-1 md:px-3  font-semibold">
                {t("product.items")}
              </th>
              <th className="text-left py-2 px-1 md:px-3  font-semibold">
                {t("product.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map(({ id, name, items }) => (
              <tr
                key={id}
                className="border-b border-textClr/10 hover:bg-gray-50 transition text-[12px] md:text-sm"
              >
                <td className="py-2 px-1 md:px-3 font-medium text-textClr">
                  {name}
                </td>
                <td className="py-2 px-1 md:px-3 font-medium text-textClr">
                  {items.join(", ")}
                </td>
                <td className="py-2 px-1 md:px-3 font-medium text-textClr flex flex-col md:flex-row gap-2 items-center">
                  <button className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded  transition">
                    {t("common.edit")}
                  </button>
                  <button
                    onClick={() => {
                      /* Optional delete logic */
                    }}
                    className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded transition"
                  >
                    {t("common.delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#9A9A9A50]  flex justify-center items-center z-50 font-Roboto">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md text-sm">
            <h3 className="text-Blue font-medium text-center mb-4">
              {t("product.add_category")}
            </h3>

            <label className="block font-medium  mb-1">
              {t("product.new_category")}
            </label>
            <input
              type="text"
              placeholder={t('product.placeholder.name')}
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:border-blue-600"
            />

            <label className="block font-medium  mb-1">
              {t("product.cate_prod_name")}
            </label>
            <textarea
              placeholder={t('product.placeholder.name')}
              value={newCategoryItems}
              onChange={(e) => setNewCategoryItems(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded p-2 mb-4 resize-none focus:outline-none focus:border-blue-600"
            />

            <button
              onClick={handleAddCategory}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded mb-3 transition"
            >
              {t("product.add")}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold w-full py-2 rounded transition"
            >
              {t("product.cancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
