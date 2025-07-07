import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ENDPOINTS } from "../../api/endpoints";
import baseApi from "../../api/baseApi";
import { getToken } from "../../utils/helpers";
import { Eye, EyeOff } from "lucide-react";

const Employee = () => {
  // initialEmployee Details -> Empty employee obj \\
  const initialEmployee = {
    name: "",
    designation: "",
    email: "",
    password: "",
    phone: "",
  };
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const { t } = useTranslation(); // Use the i18next hook for translation
  const [newEmployee, setNewEmployee] = useState(initialEmployee);
  const [isCreating, setIsCreating] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fetch EmployeeDetails
  const fetchEmployeeDetails = async () => {
    const response = await baseApi.get(ENDPOINTS.ALL_EMPLOYEE_LIST, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (response.status === 200) {
      // setEmployees(response.data.employees)
      // const { name, email, phone, role } = response.data.employees;
      // console.log(name)
      const apiRes = response.data.employees;
      console.log(apiRes);
      const transformed = apiRes.map((emp) => ({
        name: emp.name,
        email: emp.email,
        phone: emp.phone,
        id: emp.id,
        designation: emp.designation.name || "",
      }));

      console.log(transformed);
      setEmployees(response.data);

      setEmployees(transformed);
      setNewEmployee(transformed);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  // Create new employee
  const handleAddNewEmployee = async () => {
    if (
      !newEmployee.name ||
      !newEmployee.designation ||
      !newEmployee.email ||
      !newEmployee.phone ||
      !newEmployee.password
    )
      return alert("Please fill all fields");

    try {
      setIsCreating(true); // Start animation
      const response = await baseApi.post(
        ENDPOINTS.CREATE_EMPLOYEE,
        newEmployee,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (response.status === 201) {
        setShowModal(false);
        fetchEmployeeDetails();
      }
    } catch (error) {
      if (error.response.data.phone) {
        alert(error.response.data.phone[0]);
      }
      if (error.response.data.email[0]) {
        alert(error.response.data.email[0]);
      }

      console.error(
        "❌ Error creating employee:",
        error.response?.data || error.message
      );
      // alert(err)
      // console.error(error.response.data?.email);
      alert(
        "Something is wrong. Try another email or enter a valid phone number"
      );
    } finally {
      setIsCreating(false); // End animation
    }
  };

  const handleRemove = async (id) => {
    const response = await baseApi.delete(ENDPOINTS.DELETE_EMPLOYEE + id, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(response);
    fetchEmployeeDetails();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="my-10 px-4 md:px-8 font-sans text-gray-900 pb-10">
      <h2 className="text-3xl font-bold mb-8">{t("employee.employee")}</h2>

      {/* Employees Details Section */}
      <section className="bg-white rounded-xl p-6 md:p-8 shadow-md mb-10">
        <h3 className="text-xl font-semibold mb-1">
          {t("employee.emp_details")}
        </h3>
        <p className="text-xs text-gray-600 mb-4">
          {t("employee.manage_employees")}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-6 transition"
        >
          {t("employee.add_employee")}
        </button>

        {/* <table className="w-full border-collapse text-[12px] md:text-sm">
          <thead>
            <tr>
              <th className="text-left font-semibold pb-3 border-b border-gray-300 text-gray-700">
                {" "}
                {t("employee.name")}
              </th>
              <th className="text-left font-semibold pb-3 border-b border-gray-300 text-gray-700">
                {" "}
                {t("employee.designation")}
              </th>
              <th className="text-left font-semibold pb-3 border-b border-gray-300 text-gray-700">
                {t("employee.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map(({ id, name, designation }) => (
              <tr key={id} className="hover:bg-gray-50 transition ">
                <td className="py-3 border-b border-gray-200">{name}</td>
                <td className="py-3 border-b border-gray-200">{designation}</td>
                <td className="py-3 border-b border-gray-200">
                  <button
                    onClick={() => handleRemove(id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded transition"
                  >
                    {t("common.remove")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </section>

      {/* Employee Details Section */}
      <section className="bg-white rounded-xl p-6 md:p-8 shadow-md my-5">
        <h3 className="text-xl font-semibold mb-1">
          {t("employee.emp_details")}
        </h3>
        <p className="text-xs text-gray-600 mb-4">
          {t("employee.manage_employees")}
        </p>

        <table className="w-full border-collapse text-center ">
          <thead className="text-center">
            <tr className="text-[9px] md:text-sm ">
              <th className="font-semibold py-2 px-1 md:px-3 border-b border-gray-300 text-gray-700 bg-gray-200 border">
                {t("employee.id")}
              </th>
              <th className="font-semibold py-2 px-1 md:px-3 border-b border-gray-300 text-gray-700 bg-gray-200 border">
                {" "}
                {t("employee.name")}
              </th>
              <th className="font-semibold py-2 px-1 md:px-3 border-b border-gray-300 text-gray-700 bg-gray-200 border">
                {" "}
                {t("employee.designation")}
              </th>

              <th className="font-semibold py-2 px-1 md:px-3 border-b border-gray-300 text-gray-700 bg-gray-200 border">
                {t("employee.email")}
              </th>
              <th className="font-semibold py-2 px-1 md:px-3 border-b border-gray-300 text-gray-700 bg-gray-200 border">
                {t("employee.phone")}
              </th>
              <th className="font-semibold py-2 px-1 md:px-3 border-b border-gray-300 text-gray-700 bg-gray-200 border">
                {t("employee.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map(({ id, name, designation, email, phone }) => (
              <tr
                key={id}
                className="hover:bg-gray-50 transition text-[9px] md:text-sm"
              >
                <td className="py-2 px-1 md:px-3 border-b border-gray-200 border text-textClr/60">
                  {id}
                </td>
                <td className="py-2 px-1 md:px-3 border-b border-gray-200 border font-semibold">
                  {name}
                </td>
                <td className="py-2 px-1 md:px-3 border-b border-gray-200 border text-textClr/60">
                  {designation}
                </td>
                <td className="py-2 px-1 md:px-3 border-b border-gray-200 border text-textClr/60">
                  {email}
                </td>
                {/* <td className="py-2 px-1 md:px-3 border-b border-gray-200 border text-textClr/60">
                  {password}
                </td> */}
                <td className="py-2 px-1 md:px-3 border-b border-gray-200 border text-textClr/60">
                  {phone}
                </td>
                <td className="py-2 px-1 md:px-3 border-b border-gray-200 border text-textClr/60">
                  <button
                    onClick={() => handleRemove(id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded transition"
                  >
                    {t("common.remove")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination section */}
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
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#9A9A9A50]  flex justify-center items-center z-50 font-Roboto">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-blue-900 text-center">
              {t("employee.add_employee")}
            </h3>

            <label className="flex flex-col text-gray-800 font-semibold text-sm">
              {t("employee.emp_name")}
              <input
                type="text"
                name="name"
                value={newEmployee.name}
                placeholder={t("employee.placeholder.name")}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
            </label>

            <label className="flex flex-col text-gray-800 font-semibold text-sm">
              {t("employee.designation")}
              <input
                type="text"
                name="designation"
                value={newEmployee.designation}
                placeholder={t("employee.placeholder.designation")}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
            </label>

            <label className="flex flex-col text-gray-800 font-semibold text-sm">
              {t("employee.email")}
              <input
                type="email"
                name="email"
                value={newEmployee.email}
                placeholder={t("employee.placeholder.email")}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
            </label>

            <label className="flex flex-col text-gray-800 font-semibold text-sm">
              {t("employee.phone")}
              <input
                type="phone"
                name="phone"
                value={newEmployee.phone}
                placeholder={t("employee.placeholder.phone")}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
            </label>

            <label className="flex flex-col text-gray-800 font-semibold text-sm">
              {t("employee.password")}
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={newEmployee.password}
                  placeholder={t("employee.placeholder.password")}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-600"
                />
                {showPass ? (
                  <EyeOff
                    className="absolute right-2 top-2.5 cursor-pointer text-gray-500"
                    onClick={() => setShowPass(false)}
                  />
                ) : (
                  <Eye
                    className="absolute right-2 top-2.5 cursor-pointer text-gray-500"
                    onClick={() => setShowPass(true)}
                  />
                )}
              </div>
            </label>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-2 transition flex items-center justify-center"
              onClick={handleAddNewEmployee}
              disabled={isCreating}
            >
              {isCreating ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                t("employee.add")
              )}
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded mt-2 transition"
              onClick={() => setShowModal(false)}
            >
              {t("employee.cancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
