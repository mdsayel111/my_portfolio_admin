import {
  CLTable,
  CLTableActionButtons,
  CLTableBody,
  CLTableCell,
  CLTableFooter,
  CLTableHeader,
  CLTableRow,
  Header,
  Modal,
} from "@antopolis/admin-component-library/dist/elements";
import { useEntityState } from "@antopolis/admin-component-library/dist/hooks";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useEffect, useState } from "react";
import ViewOrderDetails from "../../../Components/ViewOrderDetails/ViewOrderDetails";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { ORDERS_API } from "../../../Utilities/APIs/APIs";
import DatePickerWithRange from "../../../Components/Partials/Element/DatePickerWithRang/DatePickerWithRang";
import { format } from "date-fns";
function TimelyRangOrderReports() {
  const axiosInstance = useAxiosInstance();
  const {
    data,
    setData,
    setEditModal,
    editModal,
    createModal,
    setCreateModal,
    archiveModal,
    setArchiveModal,
    toggleFilter,
    toggleFilterValue,
    setToggleFilter,
    target,
    setTarget,
    toggleFetch,
    toggle,
    paginationState,
    setPaginationState,
    setTotalPages,
    setTotalData,
    viewModal,
    setViewModal,
  } = useEntityState();

  const [filter, setFilter] = useState("processing");
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });
  const [viewModalCSS, setViewModalCSS] = useState("");

  useEffect(() => {
    console.log("This useEffect runs");

    async function fetchData() {
      const endpoint = `${ORDERS_API}getTimeRangeOrders/${format(
        dateRange.from,
        "yyyy-MM-dd"
      )}/${format(dateRange.to, "yyyy-MM-dd")}?filter=${filter}`;

      const { data: timelyRangReportsData, status: responseStatus } =
        await axiosInstance.get(endpoint, {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        });

      if (responseStatus === 200) {
        setData(timelyRangReportsData);
        setTotalPages(timelyRangReportsData?.totalPages);
        setTotalData(timelyRangReportsData?.totalItems);
      } else {
        console.error("Failed to fetch course category:");
      }
    }
    fetchData();
  }, [toggle, filter, dateRange]);

  console.log("Timely Rang Order Data", data);
  console.log("Date Range", dateRange);
  console.log("viewModal", viewModal);

  const headers = [
    { label: "Branch", className: "min-w-24" },
    { label: "Customer", className: "min-w-36" },
    { label: "Status", className: "min-w-36" },
    { label: "Amount", className: "min-w-36" },
  ];

  const tab = [
    {
      label: "Processing",
      value: "processing",
    },
  ];

  return (
    <CardLayout>
      <div className="sm:flex justify-between items-center ">
        <Header
          heading={` Orders - Total ${data?.length}`}
          tabs={tab}
          hasModal={false}
          filterAndSearchProps={{
            filter,
            setFilter,
            hasSearch: false,
            hasFilter: true,
            toggleFilterValue,
            toggleFilter,
            setToggleFilter,
          }}
        />

        <DatePickerWithRange range={dateRange} setRange={setDateRange} />
      </div>

      <CLTable containerClassName="" tableClassName="">
        <CLTableHeader headers={headers} hasActions={true} />
        <CLTableBody className="scroll">
          {data?.length > 0 &&
            data
              .slice()
              .reverse()
              .map((item, index) => (
                <CLTableRow key={index} className="">
                  <CLTableCell className="" text={item?.branch?.name} />
                  <CLTableCell className="" text={item?.customer?.name} />
                  <CLTableCell className="" text={item?.orderStatus} />
                  <CLTableCell className="" text={item?.total?.toFixed(2)} />
                  <div className="flex justify-end items-center">
                    <CLTableActionButtons
                      isActive={item.isActive || true}
                      target={item}
                      hasView={true}
                      viewBtnProps={{ setViewModal, setTarget }}
                      hasEdit={false}
                      hasArchive={false}
                    />
                  </div>
                </CLTableRow>
              ))}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Course"
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      {/* <Modal
        isOpen={viewModal}
        onClose={setViewModal}
        title={"View Order Details"}
        contentClassName={`${
          viewModalCSS == "orderItems"
            ? "w-full max-w-6xl"
            : "max-w-lg mx-auto p-4 rounded-md border-gray-500"
        }`}
      >
        <ViewOrderDetails
          setViewModalCSS={setViewModalCSS}
          api={`${ORDERS_API}getSingleOrder/${target?._id}`}
        />
      </Modal> */}

      <Modal
        isOpen={viewModal}
        onClose={setViewModal}
        title={"View Order Details"}
        contentClassName={`${
          viewModalCSS == "orderItems"
            ? "w-full max-w-3xl"
            : "max-w-lg mx-auto p-4 rounded-md border-gray-500"
        }`}
      >
        <ViewOrderDetails
          setViewModalCSS={setViewModalCSS}
          api={`${ORDERS_API}getSingleOrder/${target?._id}`}
        />
      </Modal>
    </CardLayout>
  );
}

export default TimelyRangOrderReports;
