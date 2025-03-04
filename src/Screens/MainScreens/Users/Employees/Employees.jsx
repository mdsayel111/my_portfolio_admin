import {
  ArchiveModal,
  CLTable,
  CLTableActionButtons,
  CLTableBody,
  CLTableCell,
  CLTableFooter,
  CLTableHeader,
  CLTableImageCell,
  CLTableRow,
  Header,
  Modal,
} from "@antopolis/admin-component-library/dist/elements";

import {
  toast,
  useEntityState,
} from "@antopolis/admin-component-library/dist/hooks";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import {
  IMAGE_URL,
  MANAGE_EMPLOYEE_API,
} from "../../../../Utilities/APIs/APIs";
import InviteEmployee from "./InviteEmployee";
import { ConformationPopup } from "../../../../Components/ConformationPopup/ConformationPopup";
import { ViewDetailsModal } from "../../../../Components/ViewDetailsModal/ViewDetailsModal";

function Employees() {
  const axiosInstance = useAxiosInstance();
  const {
    data,
    setData,
    setFilter,
    createModal,
    setCreateModal,
    archiveModal,
    setArchiveModal,
    filter,
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

  const [isConformationPopupOpen, setIsConformationPopupOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const endpoint =
          filter === "Invite"
            ? `${MANAGE_EMPLOYEE_API}getAllEmployeeInvites`
            : `${MANAGE_EMPLOYEE_API}getAllEmployees/?filter=${filter}`;

        const { data: employeeData, status } = await axiosInstance.get(
          endpoint,
          {
            params: {
              page: paginationState.currentPage,
              limit: paginationState.limit,
            },
          }
        );

        if (status === 200) {
          setData(employeeData);
          setTotalPages(employeeData?.totalPages);
          setTotalData(employeeData?.totalItems);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: `Failed to fetch employee data`,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `An error occurred while fetching employee data`,
        });
      }
    }

    fetchData();
  }, [toggle, filter, paginationState.currentPage, paginationState.limit]);

  const employeeTableheaders = [
    { label: "Image", className: "min-w-24" },
    { label: "Name", className: "min-w-24" },
  ];

  const inviteTableheaders = [
    { label: "Email", className: "min-w-24" },
    { label: "Name", className: "min-w-24" },
  ];

  const Tabs = [
    { value: "active", label: "Active" },
    { value: "archived", label: "Archived" },
    { value: "Invite", label: "Invite" },
  ];

  return (
    <CardLayout>
      <Header
        heading={`Employees - Total ${data?.length}`}
        openModal={setCreateModal}
        modalLabel="Invite Employee"
        searchPlaceholder="Search Employee"
        tabs={Tabs}
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

      <CLTable containerClassName="" tableClassName="">
        <CLTableHeader
          headers={
            filter === "Invite" ? inviteTableheaders : employeeTableheaders
          }
          hasActions={true}
        />
        <CLTableBody className="">
          {data?.length > 0 &&
            data.map((item, index) => (
              <CLTableRow key={index} className="">
                {filter === "Invite" ? (
                  <>
                    <CLTableCell className="" text={item?.email} />
                    <CLTableCell className="" text={item?.employee?.name} />
                  </>
                ) : (
                  <>
                    <CLTableImageCell url={IMAGE_URL + item?.dp} />
                    <CLTableCell className="" text={item?.name} />
                  </>
                )}
                <CLTableActionButtons
                  isActive={item.isActive || true}
                  target={item}
                  hasView={true}
                  hasEdit={false}
                  hasArchive={filter !== "Invite"}
                  archiveBtnProps={{ setArchiveModal, setTarget }}
                  viewBtnProps={{ setViewModal, setTarget }}
                  extraAction
                  extraActions={
                    filter === "Invite"
                      ? [
                          {
                            onClick: async () => {
                              const response = await axiosInstance.delete(
                                `${MANAGE_EMPLOYEE_API}deleteEmployeeInvite/${item?._id}`
                              );
                              if (response.status === 200) {
                                toast({
                                  variant: "success",
                                  title: "Success",
                                  description: `Invite deleted`,
                                });
                              }
                              toggleFetch();
                            },
                            btnProps: {
                              icon: MdDelete,
                              tooltipText: "Delete Invite",
                              toolTipContainerClassName:
                                "!text-slate-600  hover:!bg-slate-600 hover:!text-white ",
                              toolTipClassName: "hover:!text-white ",
                            },
                          },
                          {
                            onClick: async () => {
                              const response = await axiosInstance.post(
                                `${MANAGE_EMPLOYEE_API}inviteEmployee`,
                                { email: item?.email }
                              );
                              if (response.status === 200) {
                                toast({
                                  variant: "success",
                                  title: "Success",
                                  description: `Invite sent to ${item?.email}`,
                                });
                              }
                            },
                            btnProps: {
                              icon: IoSend,
                              tooltipText: "Resend Invite",
                              toolTipContainerClassName:
                                "!text-slate-600  hover:!bg-slate-600 hover:!text-white ",
                              toolTipClassName: "hover:!text-white ",
                            },
                          },
                        ]
                      : [
                          {
                            onClick: async () => {
                              // await axiosInstance.patch(
                              //   `${MANAGE_EMPLOYEE_API}createManagerBySuperAdminOwner/${item?._id}`
                              // );
                              // toggleFetch();
                              setIsConformationPopupOpen(true);
                              setTarget(item);
                            },
                            btnProps: {
                              icon: FaUser,
                              tooltipText: "Make Manager",
                              toolTipContainerClassName:
                                "!text-slate-600  hover:!bg-slate-600 hover:!text-white ",
                              toolTipClassName: "hover:!text-white ",
                            },
                          },
                        ]
                  }
                />
              </CLTableRow>
            ))}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Customers"
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Invite Employee"}
      >
        <InviteEmployee
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${MANAGE_EMPLOYEE_API}superAdminOwnerRemoveEmployee/${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`${target?.name} has been archived`}
          isArchive={target?.isActive}
          title={target?.courseName}
        />
      )}

      {viewModal && (
        <ViewDetailsModal
          isOpen={viewModal}
          onClose={() => setViewModal(false)}
          item={"employee"}
          // api={`${MANAGE_EMPLOYEE_API}getSingleEmployee/${target?._id}`}
          api={
            filter === "Invite"
              ? `${MANAGE_EMPLOYEE_API}getSingleEmployeeInvite/${target?._id}`
              : `${MANAGE_EMPLOYEE_API}getSingleEmployee/${target?._id}`
          }
          axiosInstance={axiosInstance}
          title={
            filter === "Invite" ? "Employee Invite Details" : "Employee Details"
          }
          setData={setData}
          data={data}
          toggleFetch={toggleFetch}
        />
      )}

      <ConformationPopup
        isOpen={isConformationPopupOpen}
        onClose={() => setIsConformationPopupOpen(false)}
        title={"Make Manager"}
        customDescription={
          "Are you sure you want to make this employee a manager?"
        }
        btnText={"Make Manager"}
        api={`${MANAGE_EMPLOYEE_API}createManagerBySuperAdminOwner/${target?._id}`}
        successMessage={`${target?.name} has been made a manager`}
        failedMessage={`Failed to make ${target?.name} a manager`}
        toggleFetch={toggleFetch}
        axiosInstance={axiosInstance}
      />
    </CardLayout>
  );
}

export default Employees;
