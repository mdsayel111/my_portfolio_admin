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
import { useEffect } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_USER_CONTACT_API } from "../../../Utilities/APIs/APIs";
import ViewUserContact from "./ViewUserContact";

// import CreateContactUs from "./components/CreateContactUs";
// import ViewContact from "./components/viewContact";

function UserContacts() {
  const axiosInstance = useAxiosInstance();
  const {
    setFilter,
    setEditModal,
    editModal,
    createModal,
    setCreateModal,
    filter,
    toggle,
    toggleFilter,
    data,
    viewModal,
    setViewModal,
    setData,
    target,
    toggleFilterValue,
    setToggleFilter,
    paginationState,
    setPaginationState,
    setTotalPages,
    setTotalData,
    toggleFetch,
    setTarget,
    setArchiveModal,
    archiveModal,
  } = useEntityState();

  useEffect(() => {
    async function fetchData() {
      const { data: contactUsData, status } = await axiosInstance.get(
        `${MANAGE_USER_CONTACT_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(contactUsData?.userContact);
        setTotalPages(contactUsData?.totalPages);
        setTotalData(contactUsData?.totalItems);
      } else {
        console.error("Failed to fetch :");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [
    { label: "First Name", className: "min-w-24" },
    { label: "Last Name", className: "min-w-36 " },
    { label: "Email", className: "min-w-36 " },
    { label: "Phone", className: "min-w-36 " },
  ];

  return (
    <CardLayout>
      <Header
        heading="User Contacts"
        openModal={setCreateModal}
        modalLabel="Create New User Contact"
        searchPlaceholder="Search User Contact"
        filterAndSearchProps={{
          filter,
          setFilter,
          hasModal: false,
          hasSearch: false,
          hasFilter: true,
          toggleFilterValue,
          toggleFilter,
          setToggleFilter,
        }}
      />

      <CLTable>
        <CLTableHeader headers={headers} hasActions={true} />
        <CLTableBody>
          {data?.length > 0
            ? data.map((userContact) => (
                <CLTableRow key={userContact?._id}>
                  <CLTableCell text={userContact?.firstName} />
                  <CLTableCell text={userContact?.lastName} />
                  <CLTableCell text={userContact?.email} />

                  <CLTableActionButtons
                    isActive={userContact?.isActive}
                    target={userContact}
                    hasView={true}
                    hasEdit={false}
                    hasArchive={false}
                    viewBtnProps={{ setViewModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Boards"
        hasPagination={true}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        paginationDispatch={setPaginationState}
      />

      {viewModal && (
        <Modal isOpen={viewModal} onClose={setViewModal} title={"View Contact"}>
          <ViewUserContact target={target} setViewModal={setViewModal} />
        </Modal>
      )}
    </CardLayout>
  );
}

export default UserContacts;
